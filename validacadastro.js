document.addEventListener("DOMContentLoaded", () => {});
function validarFormulario() {
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmar_senha").value;

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem!");
    return false;
  }
  return true;
}

// URL base da API
const apiBaseURL = "http://localhost:3003";

// Função para registrar um usuário
async function registrarUsuario(event) {
  event.preventDefault(); // Evita o reload do formulário

  // Obtém os valores do formulário
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("confirma_senha").value;

  try {
    // Faz a requisição POST para a API
    const response = await axios.post(`${apiBaseURL}/Filmes/`, {
      nome,
      email,
      senha,
    });

    // Exibe o resultado no console
    console.log("Resposta da API:", response.data);
    alert("Usuário registrado com sucesso!");
  } catch (error) {
    console.error("Erro ao registrar usuário:", error.response);
    alert("Erro ao registrar usuário.");
  }
}

// Adiciona o listener ao botão do formulário
const formElement = document.getElementById("form-registro");
if (formElement) {
  formElement.addEventListener("submit", registrarUsuario);
} else {
  console.error("Erro: Formulário 'form-registro' não encontrado.");
}
