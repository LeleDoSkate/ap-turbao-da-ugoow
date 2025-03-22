const nomeInput = document.querySelector("#usuario");
const senhaInput = document.querySelector("#senha");
const mensagemError = document.querySelector(".erro");
const subimmitButton = document.querySelector("#button");

subimmitButton.addEventListener("click", (e) => {
  e.preventDefault();

  const nameInput = nomeInput.value;
  const passwordInput = senhaInput.value;

  if (nameInput === "" || passwordInput === "") {
    mensagemError.textContent =
      "Dados não preenchidos, por favor preencher todos os campos!";

    mensagemError.classList = "erro";
    mensagemError.style.textAlign = "center";
    setTimeout(() => {
      mensagemError.textContent = "";
      mensagemError.classList = "";
    }, 3000);
    return;
  }
  nomeInput.value = "";
  senhaInput.value = "";
  console.log(alert("Dados enviados com sucesso!"));
});