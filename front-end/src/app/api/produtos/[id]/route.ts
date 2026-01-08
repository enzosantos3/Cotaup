import { NextResponse } from 'next/server';
import { ProdutoDTO } from '@/types/produto';

// (mesmos dados do /api/produtos/route.ts)
const produtos: ProdutoDTO[] = [
    { id: 1, nome: "Cimento CP II 50kg", marca: "Votoran", categoria: "Materiais de Construção", unidade: "Saco", codigoEAN: 7891234567890 },
    { id: 2, nome: "Tijolo Cerâmico 6 Furos", marca: "Cerâmica Martins", categoria: "Materiais de Construção", unidade: "Milheiro", codigoEAN: 7891234567891 },
    { id: 3, nome: "Areia Média Lavada", marca: "Areião", categoria: "Materiais de Construção", unidade: "m³", codigoEAN: 7891234567892 },
    { id: 4, nome: "Tinta Látex Branco 18L", marca: "Suvinil", categoria: "Tintas e Vernizes", unidade: "Galão", codigoEAN: 7891234567893 },
    { id: 5, nome: "Argamassa AC III 20kg", marca: "Quartzolit", categoria: "Materiais de Construção", unidade: "Saco", codigoEAN: 7891234567894 },
    { id: 6, nome: "Piso Cerâmico 45x45cm", marca: "Portobello", categoria: "Revestimentos", unidade: "m²", codigoEAN: 7891234567895 },
    { id: 7, nome: "Fio Elétrico 2,5mm 100m", marca: "Pirelli", categoria: "Material Elétrico", unidade: "Rolo", codigoEAN: 7891234567896 },
    { id: 8, nome: "Tubo PVC 100mm 6m", marca: "Tigre", categoria: "Material Hidráulico", unidade: "Barra", codigoEAN: 7891234567897 },
    { id: 9, nome: "Porta de Madeira 80x210cm", marca: "Eucatex", categoria: "Esquadrias", unidade: "Unidade", codigoEAN: 7891234567898 },
    { id: 10, nome: "Janela de Alumínio 1,00x1,20m", marca: "Sasazaki", categoria: "Esquadrias", unidade: "Unidade", codigoEAN: 7891234567899 },
    { id: 11, nome: "Telha Cerâmica Colonial", marca: "Cerâmica Martins", categoria: "Materiais de Construção", unidade: "Milheiro", codigoEAN: 7891234567900 },
    { id: 12, nome: "Impermeabilizante 18L", marca: "Vedacit", categoria: "Impermeabilizantes", unidade: "Galão", codigoEAN: 7891234567901 },
];

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        const id = parseInt(params.id);
        
        const produto = produtos.find(p => p.id === id);
        
        if (!produto) {
            return NextResponse.json(
                { error: 'Produto não encontrado' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(produto);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        return NextResponse.json(
            { error: 'Erro ao buscar produto' },
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
        const dadosAtualizados: Partial<ProdutoDTO> = await request.json();
        const index = produtos.findIndex((p: ProdutoDTO) => p.id === parseInt(params.id));
        
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
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        const index = produtos.findIndex((p: ProdutoDTO) => p.id === parseInt(params.id));
        
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
