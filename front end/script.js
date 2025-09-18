// ---------- CONFIG ----------
const API_BASE = 'http://localhost:8080/fornecedor';

// ---------- SELECTORS ----------
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
function uuid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,8); }
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

// ---------- NORMALIZAÇÃO DE ID ----------
function normalizeIdOrThrow(id) {
  if (id === null || id === undefined || id === "") throw new Error("ID inválido");
  const n = Number(id);
  if (!Number.isFinite(n)) throw new Error(`ID não numérico recebido no front: "${id}". O backend espera Long.`);
  return Math.trunc(n);
}

// ---------- FETCH HELPER ----------
async function request(url, options = {}) {
  console.log("[API REQ]", options.method || "GET", url, options.body ? JSON.parse(options.body) : "");
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      ...options
    });
    console.log("[API RES]", res.status, res.statusText, url);
    if (!res.ok) {
      let errText = await res.text();
      try { errText = JSON.parse(errText).message ?? errText; } catch {}
      console.error("[API ERROR BODY]", errText);
      throw new Error(`${res.status} ${res.statusText} - ${errText}`);
    }
    const txt = await res.text();
    return txt ? JSON.parse(txt) : null;
  } catch (err) {
    console.error("[FETCH EXCEPTION]", err);
    if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
      throw new Error('Falha de conexão ou CORS. Verifique backend e CORS.');
    }
    throw err;
  }
}

// ---------- CRUD via API ----------
async function fetchFornecedores() { return await request(`${API_BASE}`, { method: 'GET' }); }
async function fetchFornecedor(id) { return await request(`${API_BASE}/${normalizeIdOrThrow(id)}`, { method: 'GET' }); }
async function createFornecedor(data) {
  const payload = {...data}; delete payload.id;
  return await request(`${API_BASE}`, { method: 'POST', body: JSON.stringify(payload) });
}
async function updateFornecedor(id, data) {
  return await request(`${API_BASE}/${normalizeIdOrThrow(id)}`, { method: 'PUT', body: JSON.stringify(data) });
}
async function deleteFornecedor(id) {
  const normalized = normalizeIdOrThrow(id);
  const url = `${API_BASE}/${normalized}`;
  console.log("Tentando deletar fornecedor em:", url);
  const res = await fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || `Erro ao deletar fornecedor`);
  }
  console.log("Fornecedor deletado:", normalized);
}

// ---------- RENDERIZAÇÃO ----------
function renderLista(lista) {
  if (!tbody) return;

  tbody.innerHTML = '';
  if (!lista || lista.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    return;
  } else if (emptyState) {
    emptyState.style.display = 'none';
  }

  lista.forEach(f => {
    const tr = document.createElement('tr');
    tr.dataset.id = f.id;
    tr.innerHTML = `
      <td>${f.nomeFantasia ?? ''}</td>
      <td>${f.razaoSocial ?? ''}</td>
      <td>${f.cnpj ?? ''}</td>
      <td>${f.inscricaoEstadual ?? ''}</td>
      <td>${f.representante ?? ''}</td>
      <td>${f.telefone ?? ''}</td>
      <td>${f.email ?? ''}</td>
      <td>${f.endereco ?? ''}</td>
      <td>
        <button data-id="${f.id}" class="btn-edit">Editar</button>
        <button data-id="${f.id}" class="btn-del">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ---------- DELEGAÇÃO DE EVENTOS ----------
tbody.addEventListener('click', async (e) => {
  const id = e.target.dataset.id;
  if (!id) return;

  if (e.target.classList.contains('btn-edit')) {
    try {
      const f = await fetchFornecedor(id);
      setFormData(f || {});
      if (btnSalvar) btnSalvar.textContent = "Atualizar";
      if (btnCancelar) btnCancelar.style.display = "inline-block";
      window.scrollTo(0, 0);
    } catch (err) {
      toast({title:"Erro", msg: err.message || "Erro ao buscar fornecedor", type:"err"});
    }
  } else if (e.target.classList.contains('btn-del')) {
    try {
      normalizeIdOrThrow(id); // validação
      state.pendingDeleteId = id;
      openModal();
    } catch (err) {
      toast({title:"Erro", msg: err.message, type:"err"});
    }
  }
});

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

// ---------- SUBMIT DO FORM ----------
form.addEventListener("submit", async (e)=>{
  e.preventDefault();
  const dados = getFormData();
  const obrig = ["cnpj","email","endereco","inscricaoEstadual","nomeFantasia","razaoSocial","representante","telefone"];
  for (const c of obrig) if (!dados[c]) return toast({title:"Campos obrigatórios", msg:"Preencha todos os campos.", type:"err"});

  try {
    if (dados.id) {
      await updateFornecedor(dados.id, dados);
      toast({title:"Atualizado", msg:"Fornecedor atualizado com sucesso.", type:"ok"});
    } else {
      await createFornecedor(dados);
      toast({title:"Criado", msg:"Fornecedor criado com sucesso.", type:"ok"});
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
        try { await deleteFornecedor(f.id); } catch {}
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
  console.log("Inicializando CRUD (API):", API_BASE);
  await carregarLista();
});
//arquivo atualizado