// ---------- CONFIG ----------
const API_BASE = 'http://localhost:8080/produtos';

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
  if (!toastStack) return console.log(title, msg);
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
    await deleteProduto(state.pendingDeleteId);
    state.pendingDeleteId = null;
    closeModal();
    await carregarLista();
    toast({title:"Excluído", msg:"Produto removido com sucesso.", type:"ok"});
  } catch (err) {
    toast({title:"Erro", msg: err.message || "Erro ao excluir", type:"err"});
  }
});
function openModal(){ modal?.setAttribute("aria-hidden","false"); }
function closeModal(){ modal?.setAttribute("aria-hidden","true"); }

// ---------- HELPERS ----------
function normalizeIdOrThrow(id) {
  if (!id && id !== 0) throw new Error("ID inválido");
  const n = Number(id);
  if (!Number.isFinite(n)) throw new Error(`ID não numérico recebido: "${id}".`);
  return Math.trunc(n);
}

function getFormData(){
  return {
    id: document.getElementById("fornId").value || null,
    nome: document.getElementById("nome").value.trim(),
    categoria: document.getElementById("categoria").value.trim(),
    marca: document.getElementById("marca").value.trim(),
    unidade: document.getElementById("unidade").value.trim(),
    quantidade: document.getElementById("quantidade").value.trim(),
    codigoEAN: document.getElementById("codigoEAN").value.trim()
  };
}

function setFormData(p){
  document.getElementById("fornId").value = p.id ?? "";
  document.getElementById("nome").value = p.nome ?? "";
  document.getElementById("categoria").value = p.categoria ?? "";
  document.getElementById("marca").value = p.marca ?? "";
  document.getElementById("unidade").value = p.unidade ?? "caixa";
  document.getElementById("quantidade").value = p.quantidade ?? "";
  document.getElementById("codigoEAN").value = p.codigoEAN ?? "";
}

function limparFormulario(){
  setFormData({});
  btnSalvar.textContent = "Cadastrar";
  btnCancelar.style.display = "none";
}

// ---------- FETCH HELPER ----------
async function request(url, options = {}) {
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      ...options
    });

    if (!res.ok) {
      let errText = await res.text();
      try { errText = JSON.parse(errText).message ?? errText; } catch {}
      throw new Error(`${res.status} ${res.statusText} - ${errText}`);
    }

    const txt = await res.text();
    return txt ? JSON.parse(txt) : null;
  } catch (err) {
    console.error("[FETCH ERROR]", err);
    if (err instanceof TypeError && err.message.includes("Failed to fetch")) {
      throw new Error("Falha de conexão com o servidor. Verifique o backend ou CORS.");
    }
    throw err;
  }
}

// ---------- CRUD ----------
async function fetchProdutos() { return await request(`${API_BASE}`, { method: 'GET' }); }
async function fetchProduto(id) { return await request(`${API_BASE}/${normalizeIdOrThrow(id)}`, { method: 'GET' }); }
async function createProduto(data) {
  const payload = {...data}; delete payload.id;
  return await request(`${API_BASE}`, { method: 'POST', body: JSON.stringify(payload) });
}
async function updateProduto(id, data) {
  const idNum = Number(id);
  if (!idNum || isNaN(idNum)) throw new Error(`ID inválido: ${id}`);
  const payload = {...data}; delete payload.id;
  return await request(`${API_BASE}/${idNum}`, { method: 'PUT', body: JSON.stringify(payload) });
}

async function deleteProduto(id) {
  const normalized = normalizeIdOrThrow(id);
  const url = `${API_BASE}/${normalized}`;
  console.log("Tentando deletar produto em:", url);

  const res = await fetch(url, { 
    method: 'DELETE', 
    headers: { 'Content-Type': 'application/json' } 
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || `Erro ao deletar produto`);
  }

  console.log("Produto deletado com sucesso:", normalized);
}


// ---------- RENDERIZAÇÃO ----------
function renderLista(lista) {
  tbody.innerHTML = '';
  if (!lista || lista.length === 0) {
    emptyState.style.display = 'block';
    return;
  }
  emptyState.style.display = 'none';

  lista.forEach(p => {
    const tr = document.createElement('tr');
    tr.dataset.id = p.id;
    tr.innerHTML = `
      <td>${p.id ?? ''}</td>
      <td>${p.nome ?? ''}</td>
      <td>${p.categoria ?? ''}</td>
      <td>${p.marca ?? ''}</td>
      <td>${p.unidade ?? ''}</td>
      <td>${p.quantidade ?? ''}</td>
      <td>${p.codigoEAN ?? ''}</td>
      <td>
      <i class="bi bi-pencil text-primary me-4 btn-edit" style="cursor:pointer;" data-id="${p.id}"></i>
      <i class="bi bi-trash text-danger btn-del" style="cursor:pointer;" data-id="${p.id}"></i>
      </td>
    `;
    tbody.appendChild(tr);

    // Adiciona os event listeners após criar os ícones
    tr.querySelector('.bi-pencil').addEventListener('click', () => {
        editar(p.id);
    });

    tr.querySelector('.bi-trash').addEventListener('click', () => {
        excluir(p.id);
    });
  });
}

// ---------- EVENTOS ----------
tbody.addEventListener('click', async (e) => {
  const id = e.target.dataset.id;
  if (!id) return;

  if (e.target.classList.contains('btn-edit')) {
    try {
      const p = await fetchProduto(id);
      setFormData(p || {});
      btnSalvar.textContent = "Atualizar";
      btnCancelar.style.display = "inline-block";
      window.scrollTo(0, 0);
    } catch (err) {
      toast({title:"Erro", msg: err.message || "Erro ao buscar produto", type:"err"});
    }
  } else if (e.target.classList.contains('btn-del')) {
    try {
      normalizeIdOrThrow(id);
      state.pendingDeleteId = id;
      openModal();
    } catch (err) {
      toast({title:"Erro", msg: err.message, type:"err"});
    }
  }
});

form.addEventListener("submit", async (e)=>{
  e.preventDefault();
  const dados = getFormData();
  const obrig = ["nome","categoria","marca","unidade","quantidade"];
  for (const c of obrig) if (!dados[c]) 
    return toast({title:"Campos obrigatórios", msg:"Preencha todos os campos.", type:"err"});

  try {
    if (dados.id) {
      await updateProduto(dados.id, dados);
      toast({title:"Atualizado", msg:"Produto atualizado com sucesso.", type:"ok"});
    } else {
      await createProduto(dados);
      toast({title:"Criado", msg:"Produto cadastrado com sucesso.", type:"ok"});
    }
    limparFormulario();
    await carregarLista();
  } catch (err) {
    toast({title:"Erro", msg: err.message || "Erro ao salvar produto", type:"err"});
  }
});

btnCancelar?.addEventListener("click", (e)=> { e.preventDefault(); limparFormulario(); });

btnClearAll?.addEventListener("click", async ()=>{
  if (!confirm("Excluir todos os produtos?")) return;
  try {
    const lista = await fetchProdutos();
    if (!lista || lista.length === 0) return toast({title:"Vazio", msg:"Nenhum produto para excluir", type:"ok"});
    for (const p of lista) {
      if (p.id != null) {
        try { await deleteProduto(p.id); } catch {}
      }
    }
    await carregarLista();
    toast({title:"OK", msg:"Todos os produtos foram excluídos", type:"ok"});
  } catch (err) {
    toast({title:"Erro", msg: err.message || "Erro ao limpar lista", type:"err"});
  }
});

// ---------- BUSCA ----------
inputBusca?.addEventListener("input", async ()=>{
  const termo = inputBusca.value.trim().toLowerCase();
  try {
    const lista = await fetchProdutos();
    const filtrada = lista.filter(p =>
      p.nome?.toLowerCase().includes(termo) ||
      p.categoria?.toLowerCase().includes(termo) ||
      p.marca?.toLowerCase().includes(termo)
    );
    renderLista(filtrada);
  } catch (err) {
    toast({title:"Erro", msg:"Falha na busca: " + err.message, type:"err"});
  }
});

// ---------- INICIALIZAÇÃO ----------
async function carregarLista() {
  try {
    const lista = await fetchProdutos();
    renderLista(lista || []);
  } catch (err) {
    toast({title:"Erro", msg:"Não foi possível carregar produtos: " + err.message, type:"err"});
    renderLista([]);
  }
}

window.addEventListener('DOMContentLoaded', async ()=>{
  console.log("Inicializando CRUD de Produtos:", API_BASE);
  await carregarLista();
});
