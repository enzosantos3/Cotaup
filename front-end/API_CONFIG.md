# 🔧 Configuração da API - Arquitetura com Proxy

Este projeto utiliza **rotas de API proxy** do Next.js para resolver problemas de CORS e melhorar a segurança.

## 🏗️ Arquitetura

```
Cliente (Browser)
    ↓
Next.js Frontend (localhost:3000)
    ↓
API Routes (Proxy) - /api/*
    ↓
Backend Spring Boot (api.cotaup.com.br)
```

## ✅ Vantagens desta Arquitetura

1. **Zero CORS**: Frontend e API no mesmo domínio
2. **HttpOnly Cookies**: Token salvo em cookie seguro (não acessível via JS)
3. **Segurança**: Protege contra XSS attacks
4. **Performance**: Menor latência em desenvolvimento
5. **Simplicidade**: Sem configuração CORS complexa

## 📂 Estrutura de Rotas de Proxy

### Autenticação
- `POST /api/auth/login` → Proxy para `https://api.cotaup.com.br/auth/login`
- `POST /api/auth/register` → Proxy para `https://api.cotaup.com.br/auth/register`
- `POST /api/auth/logout` → Limpa cookies de autenticação

### Outras rotas (a implementar conforme necessário)
- `GET /api/cotacoes/*` → Proxy com token no header
- `GET /api/produtos/*` → Proxy com token no header
- etc.

## 🔐 Sistema de Autenticação

### Login Flow
1. Cliente envia credenciais para `/api/auth/login`
2. Proxy encaminha para backend Spring Boot
3. Backend retorna JWT token
4. Proxy salva token em:
   - Cookie httpOnly (para segurança)
   - Response JSON (para localStorage no cliente)
5. Cliente redireciona para dashboard

### Proteção de Rotas
Agora usando **client-side protection** via componente `ProtectedRoute`:

```tsx
<ProtectedRoute requiredRole="COMPRADOR">
  <CompradorDashboard />
</ProtectedRoute>
```

**Não usa middleware** - proteção acontece no layout de cada seção.

## 🌐 Configuração de Ambiente

### `.env.local` (Desenvolvimento)
## 🌐 Configuração de Ambiente

### `.env.local` (Desenvolvimento)
```bash
# URL do backend (usada pelas rotas de proxy)
NEXT_PUBLIC_API_URL=http://localhost:8080

# Ou apontar direto para produção
NEXT_PUBLIC_API_URL=https://api.cotaup.com.br
```

### `.env.production` (Produção)
```bash
NEXT_PUBLIC_API_URL=https://api.cotaup.com.br
NODE_ENV=production
```

## 🛠️ Como Adicionar Novos Endpoints Proxy

### 1. Criar rota de API
```typescript
// src/app/api/cotacoes/route.ts
import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value;
    
    const response = await fetch(`${API_BASE_URL}/cotacoes/listar`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    
    const data = await response.json();
    return NextResponse.json(data);
}
```

### 2. Usar no service
```typescript
// src/services/cotacaoService.ts
async listarCotacoes() {
    const response = await fetch('/api/cotacoes');
    return response.json();
}
```

## 📝 Migração de Código Existente

Se você tem serviços que fazem chamadas diretas ao backend:

**Antes:**
```typescript
fetch('https://api.cotaup.com.br/cotacoes/listar', {
    headers: { 'Authorization': `Bearer ${token}` }
})
```

**Depois:**
```typescript
fetch('/api/cotacoes') // Token é enviado automaticamente via cookie
```

## 🔒 Segurança

### Cookies HttpOnly
- Token armazenado em cookie `httpOnly=true`
- Não acessível via JavaScript
- Protege contra XSS attacks
- Enviado automaticamente em todas as requisições

### LocalStorage (Backup)
- Também salva em localStorage para compatibilidade
- Usado para verificações client-side (role, email)
- Não contém informações sensíveis além do token

## 🐛 Debug

### Verificar se proxy está funcionando
1. Abra DevTools → Network
2. Faça login
3. Verifique requisição para `/api/auth/login`
4. Status deve ser `200` ou `401` (não `403` de CORS)
5. Cookie `auth_token` deve aparecer em Application → Cookies

### Logs do servidor
```bash
# Terminal do Next.js mostrará logs das rotas de API
[API] Login proxy: { status: 200 }
```

## ✨ Vantagens

✅ **Nenhuma alteração de código** necessária  
✅ **Apenas mude o arquivo `.env`**  
✅ **Compatível com diferentes padrões** de rotas  
✅ **Fácil de deployar** em diferentes ambientes  

## 🔄 Trocar entre Mock e Backend

### Para usar Mock (desenvolvimento sem backend):
```bash
cp .env.local .env
# Mantenha NEXT_PUBLIC_API_URL=/api
npm run dev
```

### Para usar Backend (integração):
```bash
cp .env.production.example .env.local
# Ajuste NEXT_PUBLIC_API_URL para o endereço do backend
npm run dev
```

## 📁 Arquivos Importantes

```
front-end/
├── .env.local                    # Configuração ativa (não vai pro Git)
├── .env.example                  # Template para mock
├── .env.production.example       # Template para backend real
├── src/
│   ├── config/
│   │   └── api.ts               # ⭐ Configuração centralizada
│   ├── services/
│   │   ├── cotacaoService.ts    # Usa config/api.ts
│   │   └── produtoService.ts    # Usa config/api.ts
│   └── app/api/                 # Mock local (pode deletar depois)
```

## 🎯 Exemplo de Uso

O código do serviço permanece o mesmo:

```typescript
// services/cotacaoService.ts
import { getApiUrl, COTACOES_ENDPOINTS } from '../config/api';

export const cotacaoService = {
    getAllCotacoes: async () => {
        const response = await fetch(getApiUrl(COTACOES_ENDPOINTS.listar));
        return response.json();
    }
};
```

A URL final é determinada automaticamente pelas variáveis de ambiente! 🎉
