const API_BASE = "http://localhost:8080";
const params = new URLSearchParams(window.location.search);
const propostaId = params.get("id");

document.addEventListener("DOMContentLoaded", () => {
  if (!propostaId) {
    alert("Proposta não especificada!");
    return;
  }

  carregarProdutosProposta(propostaId);
});

async function carregarProdutosProposta(id) {
  try {
    const response = await fetch(`${API_BASE}/propostas/${id}/produtos`);
    if (!response.ok) throw new Error("Erro ao buscar proposta");

    const proposta = await response.json();
    console.log("✅ Proposta recebida:", proposta);

    preencherTabelaProposta(proposta);
  } catch (error) {
    console.error("❌ Erro ao carregar proposta:", error);
    alert("Falha ao carregar produtos da proposta!");
  }
}

function preencherTabelaProposta(proposta) {
  const tabela = document.getElementById("produtosBody");
  tabela.innerHTML = "";

  if (!proposta || !proposta.cotacao || !proposta.cotacao.produtosCotacao) {
    tabela.innerHTML = `<tr><td colspan="4" class="text-center">Nenhum produto encontrado.</td></tr>`;
    return;
  }

  proposta.cotacao.produtosCotacao.forEach(prod => {
    const nomeProduto = proposta.nomeProduto || prod.nome || "Produto sem nome";
    const precoProposto = proposta.precoProposto || 0;
    const quantidade = prod.quantidade || 0;

    const row = document.createElement("tr");
    row.dataset.produtoId = prod.id;

    row.innerHTML = `
      <td>${nomeProduto}</td>
      <td>${quantidade}</td>
      <td>R$ ${precoProposto.toFixed(2)}</td>
      <td>
        <input 
          type="number" 
          class="form-control oferta-input" 
          placeholder="Digite sua nova oferta" 
          min="0" 
          step="0.01"
        >
      </td>
    `;

    tabela.appendChild(row);
  });
}
