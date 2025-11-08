// cotacoes-finalizadas.js
const API_BASE = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", () => {
  carregarCotacoesFinalizadas();
});

async function carregarCotacoesFinalizadas() {
  try {
    const res = await fetch(`${API_BASE}/cotacao/finalizadas`);
    if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);
    const cotacoes = await res.json();
    console.log("✅ Cotações finalizadas:", cotacoes);
    preencherCotacoesFinalizadas(cotacoes);
  } catch (err) {
    console.error("❌ Falha ao carregar cotações finalizadas:", err);
    const container = document.getElementById("cotacoesFinalizadasBody");
    if (container) {
      container.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Erro ao carregar cotações finalizadas.</td></tr>`;
    } else {
      // fallback: cria mensagem na página
      const body = document.querySelector("main .container") || document.body;
      const msg = document.createElement("p");
      msg.className = "text-center text-danger mt-3";
      msg.innerText = "Erro ao carregar cotações finalizadas. Veja o console para detalhes.";
      body.appendChild(msg);
    }
  }
}

function preencherCotacoesFinalizadas(cotacoes) {
  const tbody = document.getElementById("cotacoesFinalizadasBody");
  if (!tbody) {
    console.error('Elemento #cotacoesFinalizadasBody não encontrado no HTML.');
    return;
  }

  tbody.innerHTML = "";

  if (!cotacoes || cotacoes.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center">Nenhuma cotação finalizada encontrada.</td></tr>`;
    return;
  }

  cotacoes.forEach(c => {
    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.textContent = c.id ?? "-";

    const dataTd = document.createElement("td");
    dataTd.textContent = formatarData(c.dataInicio);

    const clienteTd = document.createElement("td");
    // se tiver campo cliente, tenta mostrar; senão usa nome da cotação
    clienteTd.textContent = c.clienteNome || c.cliente || c.name || "-";

    const totalTd = document.createElement("td");
    // se backend não enviar total, tenta calcular somando propostas (se presentes)
    const total = calcularTotalPropostas(c);
    totalTd.textContent = total !== null ? `R$ ${total.toFixed(2)}` : "-";

    const statusTd = document.createElement("td");
    statusTd.innerHTML = `<span class="status-finalizada">${c.status || "FINALIZADA"}</span>`;

    const acoesTd = document.createElement("td");
    const btn = document.createElement("button");
    btn.className = "btn-visualizar";
    btn.type = "button";
    btn.innerHTML = `<i class="bi bi-eye"></i> Detalhes`;
    btn.addEventListener("click", () => verDetalhes(c.id));
    acoesTd.appendChild(btn);

    tr.appendChild(idTd);
    tr.appendChild(dataTd);
    tr.appendChild(clienteTd);
    tr.appendChild(totalTd);
    tr.appendChild(statusTd);
    tr.appendChild(acoesTd);

    tbody.appendChild(tr);
  });
}

function formatarData(dataStr) {
  if (!dataStr) return "-";

  // trata strings no formato "yyyy-MM-dd" (LocalDate) sem deslocamento de fuso
  if (/^\d{4}-\d{2}-\d{2}$/.test(dataStr)) {
    const [y, m, d] = dataStr.split("-");
    return new Date(y, Number(m) - 1, d).toLocaleDateString("pt-BR");
  }

  // trata ISO completo, tenta ajustar para timezone local
  try {
    const d = new Date(dataStr);
    return d.toLocaleDateString("pt-BR");
  } catch (e) {
    return dataStr;
  }
}

function calcularTotalPropostas(cotacao) {
  // se o backend já vier com um campo de total, usa ele
  if (cotacao.totalOfertado != null) return Number(cotacao.totalOfertado);

  // se vier com propostas (lista), soma os precoProposto / precoProposto
  const propostas = cotacao.propostas || cotacao.propostaList || cotacao.propostasRecebidas;
  if (Array.isArray(propostas) && propostas.length > 0) {
    let soma = 0;
    let encontrou = false;
    propostas.forEach(p => {
      const v = p.precoProposto ?? p.preco_proposto ?? p.precoProposto ?? p.precoProposto ?? p.preco ?? p.precoProposto;
      if (v != null && !isNaN(Number(v))) {
        soma += Number(v);
        encontrou = true;
      }
    });
    return encontrou ? soma : null;
  }

  return null;
}

function verDetalhes(id) {
  if (!id) return;
  window.location.href = `/responder-cotacao/responder-cotacao.html?id=${id}`;
}
