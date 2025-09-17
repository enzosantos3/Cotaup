// ************ SEED ************
const seedFornecedor = {
  id: "seed-1",
  cnpj: "80.237.854.0001-57",
  email: "supermercado@gmail.com",
  endereco: "Rua Jose Bertao, 284, Parque Industrial I",
  inscricaoEstadual: 111343337,
  nomeFantasia: "Supermercado Do Vitao",
  razaoSocial: "SUPERMERCADO VITAO LTDA",
  representante: "Victor Marchi",
  telefone: "(44) 9 9155-5273"
};

// ************ STORAGE ************
const LS_KEYS = { FORNECEDORES: "cotaup_fornecedores" };
const state = { pagina: 1, porPagina: 8, termo: "", pendingDeleteId: null };

const lsGet = (k, f)=> { try{ return JSON.parse(localStorage.getItem(k)) ?? f; }catch{ return f; } };
const lsSet = (k, v)=> localStorage.setItem(k, JSON.stringify(v));

(function initSeed(){
  const lista = lsGet(LS_KEYS.FORNECEDORES, []);
  if (!lista || lista.length === 0){
    lsSet(LS_KEYS.FORNECEDORES, [seedFornecedor]);
  }
})();

// ************ TOASTS ************
function toast({title="Pronto!", msg="", type="ok", timeout=2400} = {}){
  const stack = document.getElementById("toastStack");
  const el = document.createElement("div");
  el.className = `toast ${type === "err" ? "err" : "ok"}`;
  el.innerHTML = `<div class="t-title">${title}</div><div class="t-msg">${msg}</div>`;
  stack.appendChild(el);
  setTimeout(()=>{ el.style.opacity = 0; setTimeout(()=> el.remove(), 200); }, timeout);
}

// ************ MODAL ************
const modal = document.getElementById("modal");
const modalConfirmBtn = document.getElementById("modalConfirm");
document.getElementById("modalCancel").addEventListener("click", ()=> closeModal());
modalConfirmBtn.addEventListener("click", ()=>{
  if (!state.pendingDeleteId) return closeModal();
  const lista = lsGet(LS_KEYS.FORNECEDORES, []);
  const nova = lista.filter(f=>f.id !== state.pendingDeleteId);
  lsSet(LS_KEYS.FORNECEDORES, nova);
  state.pendingDeleteId = null;
  closeModal();
  renderLista();
  toast({title:"Excluído", msg:"Fornecedor removido.", type:"ok"});
});
function openModal(){ modal.setAttribute("aria-hidden","false"); }
function closeModal(){ modal.setAttribute("aria-hidden","true"); }

// ************ CRUD FORNECEDORES ************
const form = document.getElementById("fornecedorForm");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");
const btnClearAll = document.getElementById("btnClearAll");
const tbody = document.getElementById("listaFornecedores");
const inputBusca = document.getElementById("busca");
const paginacao = document.getElementById("paginacao");
const emptyState = document.getElementById("emptyState");

function uuid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,8); }

function getFormData(){
  return {
    id: document.getElementById("fornId").value || uuid(),
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
  document.getElementById("fornId").value = f.id || "";
  document.getElementById("cnpj").value = f.cnpj || "";
  document.getElementById("email").value = f.email || "";
  document.getElementById("endereco").value = f.endereco || "";
  document.getElementById("inscricaoEstadual").value = f.inscricaoEstadual ?? "";
  document.getElementById("nomeFantasia").value = f.nomeFantasia || "";
  document.getElementById("razaoSocial").value = f.razaoSocial || "";
  document.getElementById("representante").value = f.representante || "";
  document.getElementById("telefone").value = f.telefone || "";
}

function limparFormulario(){
  setFormData({});
  btnSalvar.textContent = "Cadastrar";
  btnCancelar.style.display = "none";
}

// Create/Update
form.addEventListener("submit", (e)=>{
  e.preventDefault();
  const dados = getFormData();
  const obrig = ["cnpj","email","endereco","inscricaoEstadual","nomeFantasia","razaoSocial","representante","telefone"];
  for (const c of obrig){ if (dados[c] === null || dados[c] === undefined || dados[c] === "") return toast({title:"Campos obrigatórios", msg:"Preencha todos os campos.", type:"err"}); }

  const lista = lsGet(LS_KEYS.FORNECEDORES, []);
  const idx = lista.findIndex(f => f.id === dados.id);

  if (idx >= 0){
    lista[idx] = dados;
    toast({title:"Atualizado", msg:"Fornecedor atualizado com sucesso."});
  } else {
    if (lista.some(f => f.cnpj === dados.cnpj)){
      return toast({title:"CNPJ duplicado", msg:"Já existe fornecedor com esse CNPJ.", type:"err"});
    }
    lista.push(dados);
    toast({title:"Cadastrado", msg:"Fornecedor criado com sucesso."});
  }

  lsSet(LS_KEYS.FORNECEDORES, lista);
  limparFormulario();
  state.pagina = 1;
  renderLista();
});

// Cancelar edição
btnCancelar.addEventListener("click", limparFormulario);

// Busca
inputBusca.addEventListener("input", ()=>{
  state.termo = inputBusca.value.toLowerCase();
  state.pagina = 1;
  renderLista();
});

// Limpar todos
btnClearAll.addEventListener("click", ()=>{
  if (lsGet(LS_KEYS.FORNECEDORES, []).length === 0) return;
  state.pendingDeleteId = "_all_";
  const originalHandler = modalConfirmBtn.onclick;

  modalConfirmBtn.onclick = ()=>{
    if (state.pendingDeleteId === "_all_"){
      lsSet(LS_KEYS.FORNECEDORES, []);
      state.pendingDeleteId = null;
      closeModal();
      renderLista();
      toast({title:"Limpo", msg:"Todos os fornecedores foram removidos."});
      modalConfirmBtn.onclick = originalHandler || null;
    }
  };
  openModal();
});

// Filtro + paginação
function filtrar(lista){
  if (!state.termo) return lista;
  return lista.filter(f => {
    const alvo = `${f.nomeFantasia} ${f.razaoSocial} ${f.cnpj} ${f.representante} ${f.email} ${f.telefone} ${f.endereco}`.toLowerCase();
    return alvo.includes(state.termo);
  });
}
function paginar(lista){
  const total = lista.length;
  const inicio = (state.pagina - 1) * state.porPagina;
  const fim = inicio + state.porPagina;
  const pagina = lista.slice(inicio, fim);
  const totalPag = Math.max(1, Math.ceil(total / state.porPagina));
  return { pagina, total, totalPag };
}
function renderPaginacao(totalPag){
  paginacao.innerHTML = "";
  for (let i=1; i<=totalPag; i++){
    const b = document.createElement("button");
    b.textContent = i;
    if (i === state.pagina){ b.disabled = true; }
    b.addEventListener("click", ()=>{ state.pagina = i; renderLista(); });
    paginacao.appendChild(b);
  }
}

function renderLista(){
  const todos = lsGet(LS_KEYS.FORNECEDORES, []);
  const filtrados = filtrar(todos);
  const { pagina, totalPag } = paginar(filtrados);

  tbody.innerHTML = "";
  emptyState.style.display = filtrados.length ? "none" : "block";

  pagina.forEach(f=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${f.nomeFantasia}</td>
      <td>${f.razaoSocial}</td>
      <td>${f.cnpj}</td>
      <td>${f.inscricaoEstadual}</td>
      <td>${f.representante}</td>
      <td>${f.telefone}</td>
      <td>${f.email}</td>
      <td>${f.endereco}</td>
      <td class="actions-cell">
        <button class="btn btn-light" data-edit="${f.id}">Editar</button>
        <button class="btn btn-danger" data-del="${f.id}">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // ações
  tbody.querySelectorAll("[data-edit]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.getAttribute("data-edit");
      const lista = lsGet(LS_KEYS.FORNECEDORES, []);
      const f = lista.find(x=>x.id===id);
      if (!f) return;
      setFormData(f);
      btnSalvar.textContent = "Salvar alterações";
      btnCancelar.style.display = "inline-block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  tbody.querySelectorAll("[data-del]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.getAttribute("data-del");
      state.pendingDeleteId = id;

      const defaultHandler = modalConfirmBtn.onclick;
      modalConfirmBtn.onclick = ()=>{
        const lista = lsGet(LS_KEYS.FORNECEDORES, []);
        const nova = lista.filter(f=>f.id!==id);
        lsSet(LS_KEYS.FORNECEDORES, nova);
        state.pendingDeleteId = null;
        closeModal();
        renderLista();
        toast({title:"Excluído", msg:"Fornecedor removido.", type:"ok"});
        modalConfirmBtn.onclick = defaultHandler || null;
      };
      openModal();
    });
  });

  renderPaginacao(totalPag);
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  renderLista();
});