// ---------- CONFIG ----------
const API_BASE = 'http://localhost:8080/fornecedor';

// ---------- SELECTORS (mantidos) ----------
const form = document.getElementById("fornecedorForm");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");
const btnClearAll = document.getElementById("btnClearAll");
const tbody = document.getElementById("listaFornecedores");
const inputBusca = document.getElementById("busca");
const paginacao = document.getElementById("paginacao");
const emptyState = document.getElementById("emptyState");
const modal = document.getElementById("modal");
const modalConfirmBtn = document.getElementById("modalConfirm");
const modalCancelBtn = document.getElementById("modalCancel");
const toastStack = document.getElementById("toastStack");

// ---------- STATE ----------
const state = { pagina: 1, porPagina: 8, termo: "", pendingDeleteId: null };

// ---------- TOAST ----------
function toast({title="Pronto!", msg="", type="ok", timeout=2400} = {}) {
  if (!toastStack) { console.log(title, msg); return; }
  const el = document.createElement("div");
  el.className = `toast ${type === "err" ? "err" : "ok"}`;
  el.innerHTML = `<div class="t-title">${title}</div><div class="t-msg">${msg}</div>`;
  toastStack.appendChild(el);
  setTimeout(()=>{ el.style.opacity = 0; setTimeout(()=> el.remove(), 200); }, timeout);
}

// ---------- MODAL ----------
modalCancelBtn?.addEventListener("click", ()=> closeModal());
modalConfirmBtn?.addEventListener("click", async ()=>{
  if (state.pendingDeleteId == null) return closeModal();
  try {
    await deleteFornecedor(state.pendingDeleteId);
    state.pendingDeleteId = null;
    closeModal();
    await carregarLista();
    toast({title:"Excluído", msg:"Fornecedor removido.", type:"ok"});
  } catch (err) {
    toast({title:"Erro", msg: err.message || "Erro ao excluir", type:"err"});
  }
});
function openModal(){ modal?.setAttribute("aria-hidden","false"); }
function closeModal(){ modal?.setAttribute("aria-hidden","true"); }

// ---------- HELPERS DE FORM ----------
function uuid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,8); } // ainda disponível se precisar
function getFormData(){
  return {
    id: document.getElementById("fornId").value || null,
    cnpj: document.getElementById("cnpj").value.trim(),
    email: document.getElementById("email").value.trim(),
    endereco: document.getElementById("endereco").value.trim(),
    inscricaoEstadual: document.getElementById("inscricaoEstadual").value ? Number(document.getElementById("inscricaoEstadual").value) : null,
    nomeFantasia: document.getElementById("nomeFantasia").value.trim(),
    razaoSocial: document.getElementById("razaoSocial").value.trim(),
    representante: document.getElementById("representante").value.trim(),
    telefone: document.getElementById("telefone").value.trim()
  };
}
function setFormData(f){
  document.getElementById("fornId").value = f.id ?? "";
  document.getElementById("cnpj").value = f.cnpj ?? "";
  document.getElementById("email").value = f.email ?? "";
  document.getElementById("endereco").value = f.endereco ?? "";
  document.getElementById("inscricaoEstadual").value = f.inscricaoEstadual ?? "";
  document.getElementById("nomeFantasia").value = f.nomeFantasia ?? "";
  document.getElementById("razaoSocial").value = f.razaoSocial ?? "";
  document.getElementById("representante").value = f.representante ?? "";
  document.getElementById("telefone").value = f.telefone ?? "";
}
function limparFormulario(){
  setFormData({});
  if (btnSalvar) btnSalvar.textContent = "Cadastrar";
  if (btnCancelar) btnCancelar.style.display = "none";
}

// ---------- NORMALIZAÇÃO DE ID (OBRIGATÓRIO: exige Long no backend) ----------
function normalizeIdOrThrow(id) {
  if (id === null || id === undefined || id === "") throw new Error("ID inválido");
  // aceita string que represente número ou number
  const n = Number(id);
  if (!Number.isFinite(n)) {
    // se não for numérico, falha rápido (você pediu somente Long no front)
    throw new Error(`ID não numérico recebido no front: "${id}". O backend espera Long.`);
  }
  // converte pra inteiro (evita enviar 1.0 ou "1")
  return Math.trunc(n);
}

// ---------- FETCH HELPER (logs e tratamento) ----------
async function request(url, options = {}) {
  console.log("[API REQ]", options.method || "GET", url, options.body ? JSON.parse(options.body) : "");
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      ...options
    });
    console.log("[API RES]", res.status, res.statusText, url);

    const txt = await res.text(); // pega o body como string (pode ser ""/texto/JSON)

    if (!res.ok) {
      // tenta extrair mensagem do body (JSON ou texto)
      let errMsg = txt;
      try { const parsed = JSON.parse(txt); errMsg = parsed.message ?? JSON.stringify(parsed); } catch {}
      console.error("[API ERROR BODY]", errMsg);
      throw new Error(`${res.status} ${res.statusText} - ${errMsg}`);
    }

    // sucesso: tenta parse JSON, se falhar retorna o texto cru
    if (!txt) return null;
    try {
      return JSON.parse(txt);
    } catch {
      return txt; // resposta em plain text (ex.: "Fornecedor deletado com sucesso!")
    }
  } catch (err) {
    console.error("[FETCH EXCEPTION]", err);
    if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
      throw new Error('Falha de conexão ou CORS. Verifique backend e CORS.');
    }
    throw err;
  }
}


// ---------- CRUD via API ----------
async function fetchFornecedores() {
  return await request(`${API_BASE}`, { method: 'GET' });
}

async function fetchFornecedor(id) {
  const normalized = normalizeIdOrThrow(id);
  return await request(`${API_BASE}/${normalized}`, { method: 'GET' });
}

async function createFornecedor(data) {
  const payload = {...data};
  // não enviamos id ao criar
  delete payload.id;
  return await request(`${API_BASE}`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

/**
 * Atualiza um fornecedor no backend.
 * @param {number} id - ID do fornecedor a ser atualizado
 * @param {Object} campos - Campos a atualizar { nomeFantasia, razaoSocial, cnpj, inscricaoEstadual }
 */
/**
 * Atualiza um fornecedor no backend.
 * @param {number} id - ID do fornecedor
 * @param {Object} campos - Campos a atualizar { nomeFantasia, razaoSocial, cnpj, inscricaoEstadual }
 * @returns {Promise<Object>} - Retorna o fornecedor atualizado
 */
async function updateFornecedor(id, campos) {
  try {
    // Construir objeto completo do FornecedorModel
    const fornecedorAtualizado = {
      id: id,
      nomeFantasia: campos.nomeFantasia || "",
      razaoSocial: campos.razaoSocial || "",
      cnpj: campos.cnpj || "",
      inscricaoEstadual: campos.inscricaoEstadual || 0
    };

    console.log('Enviando PUT para:', `${API_BASE}/${id}`);
    console.log('Dados enviados:', fornecedorAtualizado);

    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fornecedorAtualizado)
    });

    console.log('Status da resposta:', response.status);

    if (!response.ok) {
      const texto = await response.text();
      console.error('Resposta do backend:', texto);
      throw new Error(`Erro ao atualizar fornecedor: ${response.status} - ${response.statusText}`);
    }

    const fornecedorRetornado = await response.json();
    console.log('Fornecedor atualizado com sucesso:', fornecedorRetornado);
    return fornecedorRetornado;

  } catch (error) {
    console.error('[UPDATE EXCEPTION]', error);
    throw error;
  }
}




async function deleteFornecedor(id) {
  try {
    console.log("Deletando fornecedor com ID:", id);

    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao deletar fornecedor: ${errorText}`);
    }

    const message = await response.text();
    console.log(message);
    return message;
  } catch (error) {
    console.error(error);
    throw error;
  }
}




// ---------- RENDERIZAÇÃO ----------
function renderLista(lista) {
  if (!tbody) return;
  tbody.innerHTML = '';
  if (!lista || lista.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    return;
  } else {
    if (emptyState) emptyState.style.display = 'none';
  }

  lista.forEach(f => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${f.id ?? ''}</td>
      <td>${f.nomeFantasia ?? ''}</td>
      <td>${f.razaoSocial ?? ''}</td>
      <td>${f.cnpj ?? ''}</td>
      <td>
        <button data-id="${f.id}" class="btn-edit">Editar</button>
        <button data-id="${f.id}" class="btn-del">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // delegação de eventos
  tbody.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      try {
        const f = await fetchFornecedor(id);
        setFormData(f || {});
        if (btnSalvar) btnSalvar.textContent = "Atualizar";
        if (btnCancelar) btnCancelar.style.display = "inline-block";
        window.scrollTo(0, 0);
      } catch (err) {
        toast({title:"Erro", msg: err.message || "Erro ao buscar fornecedor", type:"err"});
      }
    });
  });
  tbody.querySelectorAll('.btn-del').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      // manter apenas ids numéricos: tentamos normalizar e se falhar avisamos antes de abrir modal
      try {
        normalizeIdOrThrow(id);
        state.pendingDeleteId = id;
        openModal();
      } catch (err) {
        toast({title:"Erro", msg: err.message, type:"err"});
      }
    });
  });
}

// ---------- CARREGAR LISTA ----------
async function carregarLista() {
  try {
    const lista = await fetchFornecedores();
    renderLista(lista || []);
  } catch (err) {
    toast({title:"Erro", msg:"Não foi possível carregar fornecedores: " + (err.message || ""), type:"err"});
    renderLista([]);
  }
}

// ---------- SUBMIT DO FORM (CREATE / UPDATE) ----------
form.addEventListener("submit", async (e)=>{
  e.preventDefault();
  const dados = getFormData();
  const obrig = ["cnpj","email","endereco","inscricaoEstadual","nomeFantasia","razaoSocial","representante","telefone"];
  for (const c of obrig){ if (dados[c] === null || dados[c] === undefined || dados[c] === "") return toast({title:"Campos obrigatórios", msg:"Preencha todos os campos.", type:"err"}); }

  try {
    if (dados.id) {
      // UPDATE: certificar id numérico
      const normalized = normalizeIdOrThrow(dados.id);
      await updateFornecedor(normalized, dados);
      toast({title:"Atualizado", msg:"Fornecedor atualizado com sucesso.", type:"ok"});
    } else {
      // CREATE
      const created = await createFornecedor(dados);
      toast({title:"Criado", msg:"Fornecedor criado com sucesso.", type:"ok"});
      // se backend retornar created.id, preenche o form (opcional)
      if (created && created.id != null) setFormData(created);
    }
    limparFormulario();
    await carregarLista();
  } catch (err) {
    toast({title:"Erro", msg: err.message || "Erro ao salvar fornecedor", type:"err"});
  }
});

// ---------- BOTOES AUXILIARES ----------
btnCancelar?.addEventListener("click", (e)=> { e.preventDefault(); limparFormulario(); });

btnClearAll?.addEventListener("click", async ()=>{
  if (!confirm("Excluir todos os fornecedores?")) return;
  try {
    const lista = await fetchFornecedores();
    if (!lista || lista.length === 0) return toast({title:"Vazio", msg:"Nenhum fornecedor para excluir", type:"ok"});
    for (const f of lista) {
      if (f.id != null) {
        try { await deleteFornecedor(f.id); } catch (err) {
          console.warn("Erro ao apagar um item (continuando):", f.id, err.message);
        }
      }
    }
    await carregarLista();
    toast({title:"OK", msg:"Todos excluídos", type:"ok"});
  } catch (err) {
    toast({title:"Erro", msg: err.message || "Erro ao limpar", type:"err"});
  }
});

// ---------- INICIALIZAÇÃO ----------
window.addEventListener('DOMContentLoaded', async ()=>{
  // aviso rápido: execute o frontend através de um servidor (Live Server, npx serve, etc.)
  console.log("Inicializando CRUD (API):", API_BASE);
  await carregarLista();
});
