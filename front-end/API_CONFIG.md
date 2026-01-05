# 🔧 Configuração da API

Este projeto está preparado para funcionar tanto com **mock local** (desenvolvimento) quanto com o **backend real** (produção), sem precisar reescrever código.

## 📋 Como Funciona

Toda a configuração de rotas está centralizada em:
- **`/src/config/api.ts`** - Define os endpoints
- **`.env.local`** - Configuração de desenvolvimento
- **`.env.production`** - Configuração de produção

## 🚀 Desenvolvimento (Mock Local)

### Configuração atual (`.env.local`):
```bash
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_COTACOES_LISTAR_SUFFIX=
NEXT_PUBLIC_COTACOES_CRIAR_SUFFIX=
NEXT_PUBLIC_PRODUTOS_LISTAR_SUFFIX=
NEXT_PUBLIC_PRODUTOS_CRIAR_SUFFIX=
```

### Resultado:
- `GET /api/cotacoes` - Lista cotações (mock)
- `POST /api/cotacoes` - Cria cotação (mock)
- `GET /api/produtos` - Lista produtos (mock)

## 🌐 Produção (Backend Real)

### Quando integrar com o backend, atualize `.env.local`:

```bash
# URL do backend Spring Boot
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Sufixos das rotas do Spring Boot
NEXT_PUBLIC_COTACOES_LISTAR_SUFFIX=/listar
NEXT_PUBLIC_COTACOES_CRIAR_SUFFIX=/criar
NEXT_PUBLIC_COTACOES_DETALHE_SUFFIX=/listar

NEXT_PUBLIC_PRODUTOS_LISTAR_SUFFIX=/listar
NEXT_PUBLIC_PRODUTOS_CRIAR_SUFFIX=/criar
NEXT_PUBLIC_PRODUTOS_DETALHE_SUFFIX=/listar
```

### Resultado automático:
- `GET http://localhost:8080/api/cotacoes/listar` - Lista cotações (backend)
- `POST http://localhost:8080/api/cotacoes/criar` - Cria cotação (backend)
- `GET http://localhost:8080/api/produtos/listar` - Lista produtos (backend)

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
