const API_BASE = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", () => {
    carregarCotacoes();
});

async function carregarCotacoes() {
    try {
        const response = await fetch(`${API_BASE}/cotacao`);
        if (!response.ok) throw new Error("Erro ao buscar cotações");
        const cotacoes = await response.json();
        preencherGridCotacoes(cotacoes);
    } catch (error) {
        console.error("Erro ao carregar cotações:", error);
        const tabela = document.getElementById("cotacoesBody");
        tabela.innerHTML = `<p class="text-center text-danger">Falha ao carregar as cotações!</p>`;
    }
}

function preencherGridCotacoes(cotacoes) {
    const grid = document.getElementById("cotacoesBody");
    grid.innerHTML = "";

    if (!cotacoes || cotacoes.length === 0) {
        grid.innerHTML = `<p class="text-center">Nenhuma cotação cadastrada ainda.</p>`;
        return;
    }

    cotacoes.forEach(cotacao => {
    const card = document.createElement("div");
    card.className = "cotacao-card";
    card.innerHTML = `
        <div class="cotacao-title">${cotacao.name}</div>
        <div class="cotacao-info">Início: ${formatarData(cotacao.dataInicio)}</div>
        <div class="cotacao-info">Fim: ${formatarData(cotacao.dataFim)}</div>
        <div class="status-wrapper">
            <span class="status-label">Status:</span>
            <span class="status ${cotacao.status?.toLowerCase() || 'status-open'}">
                ${cotacao.status || "Aberta"}
            </span>
        </div>
        <a href="/responder-cotacao/responder-cotacao.html?id=${cotacao.id}" class="btn-responder">Responder</a>
    `;
    grid.appendChild(card);
});


}

function formatarData(data) {
  if (!data) return "-";
  const [ano, mes, dia] = data.split("-");
  return new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR");
}
