import { NextResponse } from "next/server";
import { FornecedorDTO } from "@/types/fornecedor";

let fornecedores: FornecedorDTO[] = [
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
];

export async function GET() {
    return NextResponse.json(fornecedores);
}

export async function POST(request: Request) {
    try {
        const novoFornecedor: Omit<FornecedorDTO, 'id'> = await request.json();
        
        const novoId = fornecedores.length > 0 ? Math.max(...fornecedores.map(f => f.id)) + 1 : 1;
        const fornecedorComId: FornecedorDTO = { ...novoFornecedor, id: novoId };
        
        fornecedores.push(fornecedorComId);
        
        return NextResponse.json(fornecedorComId, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao criar fornecedor' },
            { status: 400 }
        );
    }
}