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
  // 🔹 1. Carregar Produtos
  // ==============================
  async function carregarProdutos() {
    try {
      const response = await fetch("http://localhost:8080/produtos");
      if (!response.ok) throw new Error("Erro ao buscar produtos");
      const produtos = await response.json();

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
  // 🔹 2. Carregar Fornecedores
  // ==============================
  async function carregarFornecedores() {
    try {
      const response = await fetch("http://localhost:8080/fornecedor");
      if (!response.ok) throw new Error("Erro ao buscar fornecedores");
      const fornecedores = await response.json();

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
  // 🔹 3. Adicionar Produto
  // ==============================
  btnAddProduto.addEventListener("click", () => {
    const produtoId = produtoSelect.value;
    const produtoNome = produtoSelect.options[produtoSelect.selectedIndex]?.text;
    const quantidade = quantidadeInput.value;
    const preco = precoInput.value;

    if (!produtoId || !quantidade) {
      alert("Selecione um produto e informe a quantidade!");
      return;
    }

    // Verifica se o produto já está na lista
    const existe = produtosSelecionados.some(p => p.id === parseInt(produtoId));
    if (existe) {
      alert("Este produto já foi adicionado à cotação.");
      return;
    }

    const produto = {
      id: parseInt(produtoId),
      nome: produtoNome,
      quantidade: parseInt(quantidade),
      precoEstimado: parseFloat(preco || 0)
    };

    produtosSelecionados.push(produto);
    atualizarTabela();
    limparCamposProduto();
  });

  // ==============================
  // 🔹 4. Atualizar Tabela
  // ==============================
  function atualizarTabela() {
    tabelaProdutos.innerHTML = "";

    if (produtosSelecionados.length === 0) {
      tabelaProdutos.innerHTML = `<tr><td colspan="5" class="text-muted">Nenhum produto adicionado</td></tr>`;
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
  // 🔹 5. Remover Produto
  // ==============================
  window.removerProduto = (index) => {
    produtosSelecionados.splice(index, 1);
    atualizarTabela();
  };

  // ==============================
  // 🔹 6. Limpar Campos
  // ==============================
  function limparCamposProduto() {
    produtoSelect.value = "";
    quantidadeInput.value = "";
    precoInput.value = "";
  }

  // ==============================
  // 🔹 7. Enviar Cotação
  // ==============================
  btnEnviarCotacao.addEventListener("click", async () => {
    const fornecedoresSelecionados = Array.from(fornecedorSelect.selectedOptions).map(opt => parseInt(opt.value));

    if (produtosSelecionados.length === 0) {
      alert("Adicione pelo menos um produto à cotação!");
      return;
    }

    if (fornecedoresSelecionados.length === 0) {
      alert("Selecione ao menos um fornecedor!");
      return;
    }

    const cotacao = {
      produtos: produtosSelecionados.map(p => ({
        id: p.id,
        quantidade: p.quantidade,
        precoEstimado: p.precoEstimado
      })),
      fornecedoresIds: fornecedoresSelecionados
    };

    try {
      const response = await fetch("http://localhost:8080/cotacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cotacao)
      });

      if (!response.ok) throw new Error("Erro ao enviar cotação");

      alert("Cotação enviada com sucesso!");
      produtosSelecionados = [];
      atualizarTabela();
      fornecedorSelect.value = "";
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar cotação. Verifique o console para mais detalhes.");
    }
  });

  // ==============================
  // 🔹 8. Inicialização
  // ==============================
  carregarProdutos();
  carregarFornecedores();
});
