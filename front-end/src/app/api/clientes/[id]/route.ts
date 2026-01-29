import { ClienteDTO } from "@/types/cliente";
import { NextResponse } from "next/server";

const clientes: ClienteDTO[] = [
    {
        id: 1,
        nomeFantasia: "Tech Solutions Ltda",
        razaoSocial: "Tech Solutions Tecnologia e Serviços Ltda",
        cnpj: "12.345.678/0001-90",
        inscricaoEstadual: 123456789,
        responsavel: "João Silva",
        endereco: "Av. Paulista, 1000 - São Paulo, SP",
        telefone: "(11) 3000-0000",
        email: "contato@techsolutions.com.br"
    },
    {
        id: 2,
        nomeFantasia: "Construtora ABC",
        razaoSocial: "ABC Construções e Engenharia S.A.",
        cnpj: "23.456.789/0001-01",
        inscricaoEstadual: 234567890,
        responsavel: "Maria Santos",
        endereco: "Rua das Flores, 500 - Rio de Janeiro, RJ",
        telefone: "(21) 4000-0000",
        email: "contato@construtorabc.com.br"
    },
    {
        id: 3,
        nomeFantasia: "Supermercados Bom Preço",
        razaoSocial: "Bom Preço Comércio de Alimentos Ltda",
        cnpj: "34.567.890/0001-12",
        inscricaoEstadual: 345678901,
        responsavel: "Carlos Oliveira",
        endereco: "Av. Central, 2000 - Belo Horizonte, MG",
        telefone: "(31) 5000-0000",
        email: "compras@bompreco.com.br"
    },
    {
        id: 4,
        nomeFantasia: "Hospital Santa Casa",
        razaoSocial: "Irmandade da Santa Casa de Misericórdia",
        cnpj: "45.678.901/0001-23",
        inscricaoEstadual: 456789012,
        responsavel: "Ana Paula Costa",
        endereco: "Rua da Saúde, 100 - Curitiba, PR",
        telefone: "(41) 6000-0000",
        email: "suprimentos@santacasa.org.br"
    },
    {
        id: 5,
        nomeFantasia: "Indústria XYZ",
        razaoSocial: "XYZ Indústria e Comércio Ltda",
        cnpj: "56.789.012/0001-34",
        inscricaoEstadual: 567890123,
        responsavel: "Roberto Lima",
        endereco: "Rod. dos Bandeirantes, km 50 - Campinas, SP",
        telefone: "(19) 7000-0000",
        email: "compras@industriaxyz.com.br"
    }
];

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string}> }
) {
    try {
        const params = await context.params;
        const id = parseInt(params.id);

        const cliente = clientes.find(c => c.id === id);

        if (!cliente) {
            return NextResponse.json(
                { error: 'Cliente não encontrado' },
                { status: 404 }
            );
        }

        return NextResponse.json(cliente);
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao buscar cliente' },
            { status: 500 }
        );
    }
}
