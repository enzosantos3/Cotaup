const API_BASE = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", carregarCotacoesFinalizadas);

async function carregarCotacoesFinalizadas() {
  try {
    const response = await fetch(`${API_BASE}/cotacao/finalizadas`);
    if (!response.ok) throw new Error("Erro ao buscar cotações finalizadas");

    const cotacoes = await response.json();
    preencherCotacoesFinalizadas(cotacoes);
  } catch (error) {
    console.error("Erro ao carregar cotações finalizadas:", error);
    alert("Erro ao carregar cotações finalizadas. Verifique o console para mais detalhes.");
  }
}

function preencherCotacoesFinalizadas(cotacoes) {
  const tbody = document.getElementById("cotacoesFinalizadasBody");
  if (!tbody) {
    console.error("Elemento #cotacoesFinalizadasBody não encontrado no HTML.");
    return;
  }

  tbody.innerHTML = "";

  if (!cotacoes || cotacoes.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="text-center">Nenhuma cotação finalizada encontrada.</td></tr>`;
    return;
  }

  cotacoes.forEach(cotacao => {
    const dataFim = formatarData(cotacao.dataFim);
    const status = cotacao.status || "FINALIZADA";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${dataFim}</td>
      <td><span class="badge bg-success">${status}</span></td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="verDetalhes(${cotacao.id})">
          <i class="bi bi-eye"></i> Detalhes
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function verDetalhes(id) {
  if (!id) return;
  window.location.href = `/responder-cotacao/responder-cotacao.html?id=${id}`;
}

function formatarData(data) {
  if (!data) return "-";
  const dataFormatada = new Date(data);
  if (isNaN(dataFormatada.getTime())) return "-";
  return dataFormatada.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
