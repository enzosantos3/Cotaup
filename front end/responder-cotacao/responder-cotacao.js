const API_BASE = "http://localhost:8080";
const params = new URLSearchParams(window.location.search);
const cotacaoId = params.get("id");

document.addEventListener("DOMContentLoaded", () => {
    if (!cotacaoId) {
        alert("Cotação não especificada!");
        return;
    }
    carregarProdutosCotacao(cotacaoId);
});

async function carregarProdutosCotacao(id) {
    try {
        const response = await fetch(`${API_BASE}/cotacao/${id}/produtos`);
        if (!response.ok) throw new Error("Erro ao buscar produtos");
        const produtos = await response.json();
        preencherTabelaProdutos(produtos);
    } catch (error) {
        console.error(error);
        alert("Falha ao carregar produtos da cotação!");
    }
}

function preencherTabelaProdutos(produtos) {
    const tabela = document.getElementById("produtosBody");
    tabela.innerHTML = "";
    if (!produtos || produtos.length === 0) {
        tabela.innerHTML = `<tr><td colspan="3" class="text-center">Nenhum produto encontrado.</td></tr>`;
        return;
    }

    produtos.forEach(prod => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${prod.nome}</td>
            <td>R$ ${prod.precoSugerido.toFixed(2)}</td>
            <td><input type="number" class="form-control oferta-input" value="${prod.precoSugerido}" min="0" step="0.01"></td>
        `;
        tabela.appendChild(row);
    });
}

document.getElementById("enviarOferta").addEventListener("click", async () => {
    const tabela = document.getElementById("produtosBody");
    const ofertas = Array.from(tabela.querySelectorAll("tr")).map(row => {
        const nome = row.cells[0].innerText;
        const oferta = parseFloat(row.querySelector(".oferta-input").value);
        return { nome, oferta };
    });

    try {
        const response = await fetch(`${API_BASE}/cotacao/${cotacaoId}/oferta`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ofertas)
        });

        if (!response.ok) throw new Error("Falha ao enviar oferta");
        alert("Oferta enviada com sucesso!");
        window.location.href = "cotacoes.html";
    } catch (error) {
        console.error(error);
        alert("Erro ao enviar oferta!");
    }
});
