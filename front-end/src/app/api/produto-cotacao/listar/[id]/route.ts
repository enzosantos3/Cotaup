import { NextRequest, NextResponse } from "next/server";
import { ProdutoCotacaoDTO } from "@/types/produtoCotacao";

export async function GET(
    request: NextRequest, 
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    const produtosMock: Record<number, ProdutoCotacaoDTO[]> = {
        1: [
            {
                id: 1,
                nomeProduto: "Cimento Portland CP-II 50kg",
                marca: "Votorantim",
                quantidade: 200,
                idCotacao: 1
            },
            {
                id: 2,
                nomeProduto: "Areia Média Lavada m³",
                marca: "AreiaTech",
                quantidade: 15.5,
                idCotacao: 1
            },
            {
                id: 3,
                nomeProduto: "Tijolo Cerâmico 6 furos",
                marca: "Cerâmica Real",
                quantidade: 5000,
                idCotacao: 1
            }
        ],
        2: [
            {
                id: 4,
                nomeProduto: "Tubo PVC 100mm 6m",
                marca: "Tigre",
                quantidade: 50,
                idCotacao: 2
            },
            {
                id: 5,
                nomeProduto: "Conexão PVC Joelho 90° 100mm",
                marca: "Tigre",
                quantidade: 30,
                idCotacao: 2
            }
        ],
        3: [
            {
                id: 6,
                nomeProduto: "Tinta Acrílica Branca 18L",
                marca: "Suvinil",
                quantidade: 25,
                idCotacao: 3
            },
            {
                id: 7,
                nomeProduto: "Massa Corrida 25kg",
                marca: "Coral",
                quantidade: 40,
                idCotacao: 3
            },
            {
                id: 8,
                nomeProduto: "Lixa para Parede Grana 120",
                marca: "Norton",
                quantidade: 100,
                idCotacao: 3
            }
        ]
    };

    const produtos = produtosMock[Number(id)] || [];

    return NextResponse.json(produtos);
}
