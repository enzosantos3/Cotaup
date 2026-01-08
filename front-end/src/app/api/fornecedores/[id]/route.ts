import { NextResponse } from 'next/server';
import { FornecedorDTO } from '@/types/fornecedor';

const fornecedores: FornecedorDTO[] = [
    {
        id: 1,
        nomeFantasia: "Construtora Alfa",
        razaoSocial: "Construtora Alfa Ltda",
        cnpj: "12.345.678/0001-90",
        inscricaoEstadual: 123456789,
        representante: "João Silva",
        endereco: "Rua das Flores, 123, São Paulo, SP",
        telefone: "(11) 98765-4321",
        email: "contato@construtoralfa.com",
    },
    {
        id: 2,
        nomeFantasia: "Materiais Beta",
        razaoSocial: "Materiais de Construção Beta S/A",
        cnpj: "98.765.432/0001-12",
        inscricaoEstadual: 987654321,
        representante: "Maria Oliveira",
        endereco: "Avenida Central, 456, Rio de Janeiro, RJ",
        telefone: "(21) 91234-5678",
        email: "contato@materiaisbeta.com",
    },
    {
        id: 3,
        nomeFantasia: "Ferragens Gama",
        razaoSocial: "Ferragens e Ferramentas Gama Eireli",
        cnpj: "11.222.333/0001-44",
        inscricaoEstadual: 112233445,
        representante: "Pedro Santos",
        endereco: "Rua do Comércio, 789, Belo Horizonte, MG",
        telefone: "(31) 93456-7890",
        email: "vendas@ferragensgama.com",
    },
    {
        id: 4,
        nomeFantasia: "Tintas Delta",
        razaoSocial: "Delta Tintas e Vernizes Ltda",
        cnpj: "55.666.777/0001-88",
        inscricaoEstadual: 556667778,
        representante: "Ana Costa",
        endereco: "Avenida Industrial, 1010, Curitiba, PR",
        telefone: "(41) 94567-8901",
        email: "contato@tintasdelta.com",
    },
];

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        const id = parseInt(params.id);
        
        const fornecedor = fornecedores.find(f => f.id === id);
        
        if (!fornecedor) {
            return NextResponse.json(
                { error: 'Fornecedor não encontrado' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(fornecedor);
    } catch (error) {
        console.error('Erro ao buscar fornecedor:', error);
        return NextResponse.json(
            { error: 'Erro ao buscar fornecedor' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        const dadosAtualizados: Partial<FornecedorDTO> = await request.json();
        const index = fornecedores.findIndex((f: FornecedorDTO) => f.id === parseInt(params.id));
        
        if (index === -1) {
            return NextResponse.json(
                { error: 'Fornecedor não encontrado' },
                { status: 404 }
            );
        }
        
        fornecedores[index] = { ...fornecedores[index], ...dadosAtualizados };
        
        return NextResponse.json(fornecedores[index]);
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao atualizar fornecedor' },
            { status: 400 }
        );
    }
}

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        const index = fornecedores.findIndex((f: FornecedorDTO) => f.id === parseInt(params.id));
        
        if (index === -1) {
            return NextResponse.json(
                { error: 'Fornecedor não encontrado' },
                { status: 404 }
            );
        }
        
        fornecedores.splice(index, 1);
        
        return NextResponse.json({ message: 'Fornecedor deletado com sucesso' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao deletar fornecedor' },
            { status: 400 }
        );
    }
}
