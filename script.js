// Lista para armazenar os pedidos antes de enviá-los
let pedidos = [];

function adicionarAoPedido(event) {
    // Encontrar o produto mais próximo ao botão clicado
    const produtoDiv = event.target.closest('.produto');

    const nomeProduto = produtoDiv.querySelector("h2").innerText;
    const preco = produtoDiv.querySelector("p").innerText;
    const cor = produtoDiv.querySelector("input[type='text']").value.trim();
    const peitoralInput = produtoDiv.querySelector("input[placeholder='Ex: 70']");
    const bustoInput = produtoDiv.querySelector("input[placeholder='Ex: 90']");
    const embaixopeitoInput = produtoDiv.querySelector("input[placeholder='Ex: 40']");
    const estacaoSelect = produtoDiv.querySelector("select");

    // Capturar valores das medidas
    const peitoral = peitoralInput ? peitoralInput.value.trim() : "";
    const busto = bustoInput ? bustoInput.value.trim() : "";
    const embaixopeito = embaixopeitoInput ? embaixopeitoInput.value.trim() : "";
    const estacao = estacaoSelect ? estacaoSelect.value : "";

    // Verificar se todos os campos obrigatórios foram preenchidos
    if (cor === "" || estacao === "") {
        alert("Por favor, preencha todos os campos antes de adicionar ao pedido!");
        return;
    }

    // Verificar se os campos de medidas estão preenchidos quando existirem
    if ((peitoralInput && peitoral === "") || (bustoInput && busto === "") || (embaixopeitoInput && embaixopeito === "")) {
        alert("Por favor, preencha todas as medidas para o produto!");
        return;
    }

    // Criar um objeto com os detalhes do pedido
    const pedido = {
        produto: nomeProduto,
        preco: preco,
        cor: cor,
        peitoral: peitoral || "Não informado",
        busto: busto || "Não informado",
        embaixopeito: embaixopeito || "Não informado",
        estacao: estacao
    };

    // Adicionar pedido à lista
    pedidos.push(pedido);

    // Exibir mensagem de sucesso
    alert(`✅ ${nomeProduto} foi adicionado ao pedido!`);

    // Limpar os campos após adicionar o pedido
    produtoDiv.querySelector("input[type='text']").value = "";
    if (peitoralInput) peitoralInput.value = "";
    if (bustoInput) bustoInput.value = "";
    if (embaixopeitoInput) embaixopeitoInput.value = "";
    if (estacaoSelect) estacaoSelect.value = "";
}

function finalizarPedido() {
    if (pedidos.length === 0) {
        alert("Seu pedido está vazio! Adicione pelo menos um produto.");
        return;
    }

    let mensagem = `*Oiee Gabs! Tá por aí? Gostaria de fazer um pedido:*\n\n`;

    pedidos.forEach((pedido, index) => {
        mensagem += `*Item ${index + 1}:* ${pedido.produto}\n`;
        mensagem += `*Preço:* ${pedido.preco}\n`;
        mensagem += `*Cor:* ${pedido.cor}\n`;
        if (pedido.peitoral !== "Não informado") mensagem += `*Peitoral:* ${pedido.peitoral} cm\n`;
        if (pedido.busto !== "Não informado") mensagem += `*Busto:* ${pedido.busto} cm\n`;
        if (pedido.embaixopeito !== "Não informado") mensagem += `*Embaixo do peito:* ${pedido.embaixopeito} cm\n`;
        mensagem += `*Estação de entrega:* ${pedido.estacao}\n`;
        mensagem += `-----------------------------\n`;
    });

    mensagem += `\nAguardando confirmação de pedido. Obrigado!`;

    // Substituir espaços por %20 para a URL do WhatsApp
    const mensagemFormatada = encodeURIComponent(mensagem);
    const telefone = "5511949930186"; // Substitua pelo número correto

    // Abrir WhatsApp
    window.open(`https://wa.me/${telefone}?text=${mensagemFormatada}`, "_blank");

    // Limpar a lista de pedidos após o envio
    pedidos = [];
}

// Função para enviar o pedido
function enviarPedido() {
    // Impede o evento de ser registrado múltiplas vezes
    if (!event.target.hasAttribute("data-processed")) {
        event.target.setAttribute("data-processed", "true");
        adicionarAoPedido(event);
    }
}

// Adicionar eventos para todos os botões "Fazer pedido"
document.querySelectorAll(".produto button").forEach(button => {
    button.innerText = "Fazer pedido"; // Alterar o texto do botão
    button.addEventListener("click", enviarPedido);
});

// Criar botão "Finalizar Pedido"
const finalizarBtn = document.createElement("button");
finalizarBtn.innerText = "Finalizar Pedido";
finalizarBtn.classList.add("finalizar-pedido"); // Aplica a classe CSS
finalizarBtn.addEventListener("click", finalizarPedido);

// Adicionar o botão ao final da seção de produtos
document.querySelector(".produtos").appendChild(finalizarBtn);


