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
    tabela.innerHTML = `<tr><td colspan="3" class="text-center">Nenhum produto encontrado.</td></tr>`;
    return;
  }

  produtos.forEach(prod => {
    const nomeProduto = prod.nome || prod.name || "Produto sem nome";
    const preco = prod.precoSugerido || prod.precoEstimado || 0;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${nomeProduto}</td>
      <td>R$ ${preco.toFixed(2)}</td>
      <td>
        <input 
          type="number" 
          class="form-control oferta-input" 
          value="${preco.toFixed(2)}" 
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
    alert("Nenhum produto para enviar oferta!");
    return;
  }

  const ofertas = Array.from(linhas)
    .map(row => {
      const nome = row.cells[0]?.innerText?.trim();
      const input = row.querySelector(".oferta-input");
      const oferta = parseFloat(input?.value || 0);

      if (!nome) return null;
      return { nome, oferta };
    })
    .filter(Boolean);

  console.log("📦 Ofertas a enviar:", ofertas);

  try {
    const response = await fetch(`${API_BASE}/cotacao/${cotacaoId}/oferta`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ofertas)
    });

    if (!response.ok) throw new Error("Falha ao enviar oferta");

    alert("✅ Oferta enviada com sucesso!");
    window.location.href = "../cotacoes.html";
  } catch (error) {
    console.error("❌ Erro ao enviar oferta:", error);
    alert("Erro ao enviar oferta! Veja o console para detalhes.");
  }
});
