import { NextResponse } from 'next/server';
import { ProdutoDTO } from '@/types/produto';

let produtos: ProdutoDTO[] = [
    {
        id: 1,
        nome: 'Cimento Portland CP II',
        marca: 'Votoran',
        categoria: 'Materiais de Construção',
        unidadeMedida: 'Saco 50kg',
        preco: 32.50,
        codigoBarras: 7891234567890,
    },
    {
        id: 2,
        nome: 'Tijolo Cerâmico 6 Furos',
        marca: 'Cerâmica São João',
        categoria: 'Materiais de Construção',
        unidadeMedida: 'Unidade',
        preco: 0.85,
        codigoBarras: 7891234567891,
    },
    {
        id: 3,
        nome: 'Areia Média',
        marca: 'Areião SP',
        categoria: 'Agregados',
        unidadeMedida: 'm³',
        preco: 120.00,
        codigoBarras: 7891234567892,
    },
    {
        id: 4,
        nome: 'Brita 1',
        marca: 'Pedreira Central',
        categoria: 'Agregados',
        unidadeMedida: 'm³',
        preco: 95.00,
        codigoBarras: 7891234567893,
    },
    {
        id: 5,
        nome: 'Tinta Acrílica Premium Branca',
        marca: 'Suvinil',
        categoria: 'Tintas e Vernizes',
        unidadeMedida: 'Galão 3,6L',
        preco: 145.90,
        codigoBarras: 7891234567894,
    },
    {
        id: 6,
        nome: 'Vergalhão CA-50 10mm',
        marca: 'Gerdau',
        categoria: 'Ferragens',
        unidadeMedida: 'Barra 12m',
        preco: 48.00,
        codigoBarras: 7891234567895,
    },
    {
        id: 7,
        nome: 'Piso Cerâmico 60x60',
        marca: 'Portobello',
        categoria: 'Revestimentos',
        unidadeMedida: 'm²',
        preco: 89.90,
        codigoBarras: 7891234567896,
    },
    {
        id: 8,
        nome: 'Argamassa AC-II',
        marca: 'Quartzolit',
        categoria: 'Argamassas',
        unidadeMedida: 'Saco 20kg',
        preco: 28.50,
        codigoBarras: 7891234567897,
    },
    {
        id: 9,
        nome: 'Porta de Madeira 80x210cm',
        marca: 'Esquadriart',
        categoria: 'Esquadrias',
        unidadeMedida: 'Unidade',
        preco: 380.00,
        codigoBarras: 7891234567898,
    },
    {
        id: 10,
        nome: 'Tomada 2P+T 10A',
        marca: 'Tramontina',
        categoria: 'Material Elétrico',
        unidadeMedida: 'Unidade',
        preco: 12.90,
        codigoBarras: 7891234567899,
    },
    {
        id: 11,
        nome: 'Tubo PVC 100mm',
        marca: 'Tigre',
        categoria: 'Material Hidráulico',
        unidadeMedida: 'Barra 6m',
        preco: 52.00,
        codigoBarras: 7891234567800,
    },
    {
        id: 12,
        nome: 'Cal Hidratada CH-I',
        marca: 'Supercal',
        categoria: 'Materiais de Construção',
        unidadeMedida: 'Saco 20kg',
        preco: 18.50,
        codigoBarras: 7891234567801,
    },
];

export async function GET() {
    return NextResponse.json(produtos);
}

export async function POST(request: Request) {
    try {
        const novoProduto: Omit<ProdutoDTO, 'id'> = await request.json();

        const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
        const produtoComId: ProdutoDTO = { ...novoProduto, id: novoId };
        
        produtos.push(produtoComId);
        
        return NextResponse.json(produtoComId, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao criar produto' },
            { status: 400 }
        );
    }
}
