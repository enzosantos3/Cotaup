// Dados simulados do fornecedor
const fornecedor = {
  cnpj: "80.237.854.0001-57",
  email: "supermercado@gmail.com",
  endereco: "Rua Jose Bertao, 284, Parque Industrial I",
  inscricaoEstadual: 111343337,
  nomeFantasia: "Supermercado Do Vitao",
  razaoSocial: "SUPERMERCADO VITAO LTDA",
  representante: "Victor Marchi",
  telefone: "(44) 9 9155-5273",
  senha: "12345678"
};

// Alternar telas
function showScreen(screenId) {
  document.querySelectorAll(".container").forEach(el => el.style.display = "none");
  document.getElementById(screenId).style.display = "block";
}

// Simulação de login
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const user = document.getElementById("loginUser").value;
  const pass = document.getElementById("loginPass").value;

  if ((user === fornecedor.email || user === fornecedor.cnpj) && pass === fornecedor.senha) {
    document.getElementById("userName").textContent = fornecedor.nomeFantasia;
    document.getElementById("userCnpj").textContent = fornecedor.cnpj;
    document.getElementById("userEndereco").textContent = fornecedor.endereco;
    document.getElementById("userTelefone").textContent = fornecedor.telefone;
    document.getElementById("userRepresentante").textContent = fornecedor.representante;
    showScreen("dashboard");
  } else {
    alert("E-mail/CNPJ ou senha inválidos.");
  }
});

// Simulação de cadastro
document.getElementById("cadastroForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Cadastro realizado com sucesso! Agora faça login.");
  showScreen("login");
});
