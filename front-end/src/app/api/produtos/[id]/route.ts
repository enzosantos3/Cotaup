import { NextResponse } from 'next/server';
import { ProdutoDTO } from '@/types/produto';

let produtos: ProdutoDTO[] = [];

async function getProdutos(): Promise<ProdutoDTO[]> {
    const response = await fetch('http://localhost:3000/api/produtos', {
        cache: 'no-store',
    });
    return response.json();
}

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const produtos = await getProdutos();
        const produto = produtos.find(p => p.id === parseInt(params.id));
        
        if (!produto) {
            return NextResponse.json(
                { error: 'Produto não encontrado' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(produto);
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao buscar produto' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const dadosAtualizados: Partial<ProdutoDTO> = await request.json();
        const produtos = await getProdutos();
        const index = produtos.findIndex(p => p.id === parseInt(params.id));
        
        if (index === -1) {
            return NextResponse.json(
                { error: 'Produto não encontrado' },
                { status: 404 }
            );
        }
        
        produtos[index] = { ...produtos[index], ...dadosAtualizados };
        
        return NextResponse.json(produtos[index]);
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao atualizar produto' },
            { status: 400 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const produtos = await getProdutos();
        const index = produtos.findIndex(p => p.id === parseInt(params.id));
        
        if (index === -1) {
            return NextResponse.json(
                { error: 'Produto não encontrado' },
                { status: 404 }
            );
        }
        
        produtos.splice(index, 1);
        
        return NextResponse.json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao deletar produto' },
            { status: 400 }
        );
    }
}
