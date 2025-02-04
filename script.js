// Lista para armazenar os pedidos antes de enviá-los
let pedidos = [];

function adicionarAoPedido(event) {
    // Encontrar o produto mais próximo ao botão clicado
    const produtoDiv = event.target.closest('.produto');

    const nomeProduto = produtoDiv.querySelector("h3").innerText;
    const preco = produtoDiv.querySelector("p").innerText;
    const cor = produtoDiv.querySelector("input[type='text']").value.trim();
    const cinturaInput = produtoDiv.querySelector("input[placeholder='Ex: 70']");
    const bustoInput = produtoDiv.querySelector("input[placeholder='Ex: 90']");
    const costasInput = produtoDiv.querySelector("input[placeholder='Ex: 40']");
    const estacaoSelect = produtoDiv.querySelector("select");

    // Capturar valores das medidas
    const cintura = cinturaInput ? cinturaInput.value.trim() : "";
    const busto = bustoInput ? bustoInput.value.trim() : "";
    const costas = costasInput ? costasInput.value.trim() : "";
    const estacao = estacaoSelect ? estacaoSelect.value : "";

    // Verificar se todos os campos obrigatórios foram preenchidos
    if (cor === "" || (cinturaInput && cintura === "") || 
        (bustoInput && busto === "") || (costasInput && costas === "") || estacao === "") {
        alert("Por favor, preencha todos os campos antes de adicionar ao pedido!");
        return;
    }

    // Criar um objeto com os detalhes do pedido
    const pedido = {
        produto: nomeProduto,
        preco: preco,
        cor: cor,
        cintura: cinturaInput ? cintura : "Não informado",
        busto: bustoInput ? busto : "Não informado",
        costas: costasInput ? costas : "Não informado",
        estacao: estacao
    };

    // Adicionar pedido à lista
    pedidos.push(pedido);

    // Exibir mensagem de sucesso
    alert(`✅ ${nomeProduto} foi adicionado ao pedido!`);

    // Limpar os campos após adicionar o pedido
    produtoDiv.querySelector("input[type='text']").value = "";
    if (cinturaInput) cinturaInput.value = "";
    if (bustoInput) bustoInput.value = "";
    if (costasInput) costasInput.value = "";
    if (estacaoSelect) estacaoSelect.value = "";
}

function finalizarPedido() {
    if (pedidos.length === 0) {
        alert("Seu pedido está vazio! Adicione pelo menos um produto.");
        return;
    }

    let mensagem = `*Oiee Gabs ! Tá por aí ? Gostaria de fazer um pedido:*\n\n`;

    pedidos.forEach((pedido, index) => {
        mensagem += `*Item ${index + 1}:* ${pedido.produto}\n`;
        mensagem += `*Preço:* ${pedido.preco}\n`;
        mensagem += `*Cor:* ${pedido.cor}\n`;
        if (pedido.cintura !== "Não informado") mensagem += `*Cintura:* ${pedido.cintura} cm\n`;
        if (pedido.busto !== "Não informado") mensagem += `*Busto:* ${pedido.busto} cm\n`;
        if (pedido.costas !== "Não informado") mensagem += `*Costas:* ${pedido.costas} cm\n`;
        mensagem += `*Estação de entrega:* ${pedido.estacao}\n`;
        mensagem += `-----------------------------\n`;
    });

    mensagem += `\nAguardando confirmação de pedido. Obrigado !`;

    // Substituir espaços por %20 para a URL do WhatsApp
    const mensagemFormatada = encodeURIComponent(mensagem);
    const telefone = "5511949930186"; // Substitua pelo número correto

    // Abrir WhatsApp
    window.open(`https://wa.me/${telefone}?text=${mensagemFormatada}`, "_blank");

    // Limpar a lista de pedidos após o envio
    pedidos = [];
}

// Adicionar eventos para todos os botões "Adicionar ao Pedido"
document.querySelectorAll(".produto button").forEach(button => {
    button.innerText = "Adicionar ao Pedido"; // Alterar o texto do botão
    button.addEventListener("click", adicionarAoPedido);
});

// Criar botão "Finalizar Pedido"
const finalizarBtn = document.createElement("button");
finalizarBtn.innerText = "Finalizar Pedido";
finalizarBtn.classList.add("finalizar-pedido"); // Aplica a classe CSS
finalizarBtn.addEventListener("click", finalizarPedido);

// Adicionar o botão ao final da seção de produtos
document.querySelector(".produtos").appendChild(finalizarBtn);

