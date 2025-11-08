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
    console.log("✅ Produtos recebidos:", produtos);
    preencherTabelaProdutos(produtos);
  } catch (error) {
    console.error("❌ Erro ao carregar produtos:", error);
    alert("Falha ao carregar produtos da cotação!");
  }
}

function preencherTabelaProdutos(produtos) {
  const tabela = document.getElementById("produtosBody");
  tabela.innerHTML = "";

  if (!produtos || produtos.length === 0) {
    tabela.innerHTML = `<tr><td colspan="4" class="text-center">Nenhum produto encontrado.</td></tr>`;
    return;
  }

  produtos.forEach(prod => {
    const nomeProduto = prod.nome || prod.name || "Produto sem nome";
    const preco = prod.preco || 0;
    const quantidade = prod.quantidade || 0;

    const row = document.createElement("tr");
    row.dataset.produtoId = prod.id; // importante para enviar o id
    row.innerHTML = `
      <td>${nomeProduto}</td>
      <td>${quantidade}</td>
      <td>R$ ${preco.toFixed(2)}</td>
      <td>
        <input 
          type="number" 
          class="form-control oferta-input" 
          placeholder="Digite sua oferta" 
          min="0" 
          step="0.01"
        >
      </td>
    `;
    tabela.appendChild(row);
  });
}

document.getElementById("enviarOferta").addEventListener("click", async () => {
  const tabela = document.getElementById("produtosBody");
  const linhas = tabela.querySelectorAll("tr");

  if (linhas.length === 0) {
    alert("Nenhum produto para enviar proposta!");
    return;
  }

  const propostas = Array.from(linhas)
    .map(row => {
      const produtoId = row.dataset.produtoId;
      const nome = row.cells[0]?.innerText?.trim();
      const quantidade = parseFloat(row.cells[1]?.innerText || 0);
      const input = row.querySelector(".oferta-input");
      const precoProposto = parseFloat(input?.value || 0);

      if (!produtoId || isNaN(precoProposto)) return null;

      return {
        produtoId: parseInt(produtoId),
        nome,
        quantidade,
        precoProposto
      };
    })
    .filter(Boolean);

  console.log("📦 Propostas a enviar:", propostas);

  if (propostas.length === 0) {
    alert("Preencha ao menos uma oferta antes de enviar!");
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/cotacao/${cotacaoId}/propostas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(propostas)
    });

    if (!response.ok) throw new Error("Falha ao enviar proposta");

    alert("✅ Proposta enviada com sucesso!");
    window.location.href = "../fornecedor-cotacao/fornecedor-cotacao.html";
  } catch (error) {
    console.error("❌ Erro ao enviar proposta:", error);
    alert("Erro ao enviar proposta! Veja o console para detalhes.");
  }
});
