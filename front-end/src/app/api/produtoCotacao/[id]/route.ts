import { ProdutoCotacaoDTO } from "@/types/produtoCotacao";
import { NextResponse } from "next/server";

let produtosCotacao: ProdutoCotacaoDTO[] = [
    {
        id: 1,
        nomeProduto: 'Cimento Portland CP II',
        marca: 'Votoran',
        quantidade: 100,
        idCotacao: 1,
    },
    {
        id: 2,
        nomeProduto: 'Tijolo Cerâmico 6 Furos',
        marca: 'Cerâmica São João',
        quantidade: 500,
        idCotacao: 1,
    },
    {
        id: 3,
        nomeProduto: 'Areia Média',
        marca: 'Areião SP',
        quantidade: 20,
        idCotacao: 1,
    },
    {
        id: 4,
        nomeProduto: 'Cimento Portland CP II',
        marca: 'Votoran',
        quantidade: 220,
        idCotacao: 2,
    },
    {
        id: 5,
        nomeProduto: 'Tijolo Cerâmico 6 Furos',
        marca: 'Cerâmica São João',
        quantidade: 100,
        idCotacao: 2,
    },
    {
        id: 6,
        nomeProduto: 'Areia Média',
        marca: 'Areião SP',
        quantidade: 5,
        idCotacao: 2,
    },
];

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const params = await context.params;
    const idCotacao = Number(params.id);
    const produtos = produtosCotacao.filter(
        (pc) => pc.idCotacao === idCotacao
    );

    return NextResponse.json(produtos);
}