document.addEventListener("DOMContentLoaded", () => {
  const produtoSelect = document.getElementById("produtoSelect");
  const fornecedorSelect = document.getElementById("fornecedorSelect");
  const tabelaProdutos = document.getElementById("tabelaProdutos");
  const btnAddProduto = document.getElementById("btnAddProduto");
  const btnEnviarCotacao = document.getElementById("btnEnviarCotacao");

  const quantidadeInput = document.getElementById("quantidadeInput");
  const precoInput = document.getElementById("precoInput");

  let produtosSelecionados = [];

  // ==============================
  // 1️⃣ Carregar produtos do backend
  // ==============================
  async function carregarProdutos() {
    try {
      const res = await fetch("http://localhost:8080/produtos");
      if (!res.ok) throw new Error("Erro ao buscar produtos");
      const produtos = await res.json();

      produtos.forEach(produto => {
        const option = document.createElement("option");
        option.value = produto.id;
        option.textContent = `${produto.nome} (${produto.categoria})`;
        produtoSelect.appendChild(option);
      });
    } catch (err) {
      console.error(err);
      alert("Não foi possível carregar os produtos.");
    }
  }

  // ==============================
  // 2️⃣ Carregar fornecedores do backend
  // ==============================
  async function carregarFornecedores() {
    try {
      const res = await fetch("http://localhost:8080/fornecedor");
      if (!res.ok) throw new Error("Erro ao buscar fornecedores");
      const fornecedores = await res.json();

      fornecedores.forEach(fornecedor => {
        const option = document.createElement("option");
        option.value = fornecedor.id;
        option.textContent = `${fornecedor.nomeFantasia} | ${fornecedor.cnpj}`;
        fornecedorSelect.appendChild(option);
      });
    } catch (err) {
      console.error(err);
      alert("Não foi possível carregar os fornecedores.");
    }
  }

  // ==============================
  // 3️⃣ Adicionar produto à lista
  // ==============================
  btnAddProduto.addEventListener("click", () => {
    const produtoId = parseInt(produtoSelect.value);
    const produtoNome = produtoSelect.options[produtoSelect.selectedIndex]?.text;
    const quantidade = parseInt(quantidadeInput.value);
    const preco = parseFloat(precoInput.value || 0);

    if (!produtoId || !quantidade) {
      alert("Selecione um produto e informe a quantidade!");
      return;
    }

    // Evita duplicados
    if (produtosSelecionados.some(p => p.id === produtoId)) {
      alert("Produto já adicionado!");
      return;
    }

    produtosSelecionados.push({ id: produtoId, nome: produtoNome, quantidade, precoEstimado: preco });
    atualizarTabela();
    limparCamposProduto();
  });

  // ==============================
  // 4️⃣ Atualizar tabela de produtos
  // ==============================
  function atualizarTabela() {
    tabelaProdutos.innerHTML = "";

    if (produtosSelecionados.length === 0) {
      tabelaProdutos.innerHTML = `<tr><td colspan="5" class="text-center text-muted">Nenhum produto adicionado</td></tr>`;
      return;
    }

    produtosSelecionados.forEach((p, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.id}</td>
        <td>${p.nome}</td>
        <td>${p.quantidade}</td>
        <td>${p.precoEstimado.toFixed(2)}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="removerProduto(${index})">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      tabelaProdutos.appendChild(tr);
    });
  }

  // ==============================
  // 5️⃣ Remover produto
  // ==============================
  window.removerProduto = (index) => {
    produtosSelecionados.splice(index, 1);
    atualizarTabela();
  };

  // ==============================
  // 6️⃣ Limpar campos de produto
  // ==============================
  function limparCamposProduto() {
    produtoSelect.value = "";
    quantidadeInput.value = "";
    precoInput.value = "";
  }

  // ==============================
  // 7️⃣ Enviar cotação para backend
  // ==============================
  btnEnviarCotacao.addEventListener("click", async () => {
    const fornecedoresSelecionados = Array.from(fornecedorSelect.selectedOptions)
      .map(opt => ({ id: parseInt(opt.value) }));

    if (produtosSelecionados.length === 0) {
      alert("Adicione pelo menos um produto!");
      return;
    }

    if (fornecedoresSelecionados.length === 0) {
      alert("Selecione pelo menos um fornecedor!");
      return;
    }

    const cotacao = {
      name: `Cotação - ${new Date().toISOString().split('T')[0]}`,
      produtosCotacao: produtosSelecionados.map(p => ({
        id: p.id,
        quantidade: p.quantidade,
        precoEstimado: p.precoEstimado
      })),
      fornecedoresCotacao: fornecedoresSelecionados,
      status: "ABERTA"
    };

    try {
      const res = await fetch("http://localhost:8080/cotacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cotacao)
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        throw new Error(data.message || "Erro ao enviar cotação");
      }

      alert("Cotação enviada com sucesso!");
      produtosSelecionados = [];
      atualizarTabela();
      fornecedorSelect.value = "";
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar cotação. Veja o console para detalhes.");
    }
  });

  // ==============================
  // 8️⃣ Inicialização
  // ==============================
  carregarProdutos();
  carregarFornecedores();
});
