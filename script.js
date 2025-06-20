document.getElementById("cep").addEventListener("blur", (evento)=> {
    const elemento = evento.target;
    const cepInput = elemento.value.replace(/\D/g, '');

    if(!(cepInput.length === 8)) {
        return alert("CEP inválido. O CEP deve conter 8 dígitos.")
    }

    fetch(`https://viacep.com.br/ws/${cepInput}/json/`)
        .then(response => response.json())
        .then(data =>{
            if(!data.erro){
                document.getElementById("bairro").value = data.bairro;
                document.getElementById("logradouro").value = data.logradouro;
                document.getElementById("cidade").value = data.localidade;
                document.getElementById("estado").value = data.estado;
            }else{
                alert("CEP nao encontrado.")
            }
        })
        .catch(error => console.error(`Erro ao buscar o CEP: ${cepInput}`, error))
})


//Salva os dados quando o botao é clicado
document.getElementById("salvar").addEventListener("click", () => {
    const formulario = document.getElementById("formulario");

    const dados = {
        nome: formulario.nome.value,
        cep: formulario.cep.value,
        bairro: formulario.bairro.value,
        rua: formulario.rua.value,
        numero: formulario.numero.value,
        cidade: formulario.cidade.value,
        estado: formulario.estado.value,
    }

    //Salva no localStorage
    localStorage.setItem("dadosUsuario". JSON.stringify(dados));
    alert("Dados salvos com sucesso!");
});

//Carrega os dados ao abrir a página
document.getElementById("DOMContentLoaded", () => {
    const dadosSalvos = localStorage.getItem("dadosUsuario");
    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);
        const formulario = document.getElementById("formulario");

        formulario.nome.value = dados.nome || "";
        formulario.cep.value = dados.cep || "";
        formulario.bairro.value = dados.bairro || "";
        formulario.rua.value = dados.rua || "";
        formulario.numero.value = dados.numero || "";
        formulario.cidade.value = dados.cidade || "";
        formulario.estado.value = dados.estado || "";
    }
})