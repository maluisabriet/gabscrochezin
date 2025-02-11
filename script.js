// Lista para armazenar os pedidos antes de enviá-los
let pedidos = [];

function adicionarAoPedido(event) {
    // Encontrar o produto mais próximo ao botão clicado
    const produtoDiv = event.target.closest('.produto');

    const nomeProduto = produtoDiv.querySelector("h2").innerText;
    const preco = produtoDiv.querySelector("p").innerText;
    const corInput = produtoDiv.querySelector("input[type='text']");
    const peitoralInput = produtoDiv.querySelector("input[id='peitoral']");
    const bustoInput = produtoDiv.querySelector("input[id='busto']");
    const cinturaInput = produtoDiv.querySelector("input[id='cintura']");
    const estacaoSelect = produtoDiv.querySelector("select");

    const cor = corInput ? corInput.value.trim() : "";
    const peitoral = peitoralInput ? peitoralInput.value.trim() || "Não informado" : "Não informado";
    const busto = bustoInput ? bustoInput.value.trim() || "Não informado" : "Não informado";
    const cintura = cinturaInput ? cinturaInput.value.trim() || "Não informado" : "Não informado";
    const estacao = estacaoSelect ? estacaoSelect.value : "";

    // Verificar se todos os campos obrigatórios foram preenchidos
    if (cor === "" || estacao === "") {
        alert("Por favor, preencha todos os campos antes de adicionar ao pedido!");
        return;
    }

    // Criar um objeto com os detalhes do pedido
    const pedido = {
        produto: nomeProduto,
        preco: preco,
        cor: cor,
        peitoral: peitoral,
        busto: busto,
        cintura: cintura,
        estacao: estacao
    };

    // Adicionar pedido à lista
    pedidos.push(pedido);

    // Exibir mensagem personalizada
    alert(`${nomeProduto} foi adicionado ao pedido!`);

    // Limpar os campos após adicionar o pedido
    if (corInput) corInput.value = "";
    if (peitoralInput) peitoralInput.value = "";
    if (bustoInput) bustoInput.value = "";
    if (cinturaInput) cinturaInput.value = "";
    if (estacaoSelect) estacaoSelect.value = "";
}

function finalizarPedido() {
    if (pedidos.length === 0) {
        alert("Seu pedido está vazio! Adicione pelo menos um produto.");
        return;
    }

    let mensagemFinal = "";
    let temPersonalizado = false;
    let temNormal = false;

    pedidos.forEach((pedido, index) => {
        if (pedido.produto.includes("Personalização")) {
            if (!temPersonalizado) {
                mensagemFinal += "Oiee Gabs! Tenho um pedido personalizado para você. Dá uma olhadinha:\n\n";
                temPersonalizado = true;
            }
            mensagemFinal += `Item ${index + 1}: ${pedido.produto}\n`;
            mensagemFinal += `Cor: ${pedido.cor}\n`;
            if (pedido.peitoral !== "Não informado") mensagemFinal += `Peitoral: ${pedido.peitoral} cm\n`;
            if (pedido.busto !== "Não informado") mensagemFinal += `Busto: ${pedido.busto} cm\n`;
            if (pedido.cintura !== "Não informado") mensagemFinal += `Cintura: ${pedido.cintura} cm\n`;
            mensagemFinal += `Estação de entrega: ${pedido.estacao}\n`;
            mensagemFinal += `-----------------------------\n`;
        } else {
            if (!temNormal) {
                mensagemFinal += "Oiee Gabs! Tá por aí? Gostaria de fazer um pedido:\n\n";
                temNormal = true;
            }
            mensagemFinal += `Item ${index + 1}: ${pedido.produto}\n`;
            mensagemFinal += `Preço: ${pedido.preco}\n`;
            mensagemFinal += `Cor: ${pedido.cor}\n`;
            if (pedido.peitoral !== "Não informado") mensagemFinal += `Peitoral: ${pedido.peitoral} cm\n`;
            if (pedido.busto !== "Não informado") mensagemFinal += `Busto: ${pedido.busto} cm\n`;
            if (pedido.cintura !== "Não informado") mensagemFinal += `Cintura: ${pedido.cintura} cm\n`;
            mensagemFinal += `Estação de entrega: ${pedido.estacao}\n`;
            mensagemFinal += `-----------------------------\n`;
        }
    });

    mensagemFinal += "Aguardando confirmação de pedido. Obrigado!";

    // Exibir alerta se houver personalização
    if (temPersonalizado) {
        alert("🚨 Não se esqueça de enviar a imagem de referência pelo WhatsApp após finalizar o pedido 🚨");
    }

    // Substituir espaços por %20 para a URL do WhatsApp
    const mensagemFormatada = encodeURIComponent(mensagemFinal);
    const telefone = "5511949930186"; // Substitua pelo número correto

    // Abrir WhatsApp
    window.open(`https://wa.me/${telefone}?text=${mensagemFormatada}`, "_blank");

    // Limpar a lista de pedidos após o envio
    pedidos = [];
}

// Função para enviar o pedido
function enviarPedido(event) {
    event.preventDefault();
    adicionarAoPedido(event);
}

// Adicionar eventos para todos os botões "Fazer pedido"
document.querySelectorAll(".produto button").forEach(button => {
    button.addEventListener("click", enviarPedido);
});

// Criar botão "Finalizar Pedido"
const finalizarBtn = document.createElement("button");
finalizarBtn.innerText = "Finalizar Pedido";
finalizarBtn.classList.add("finalizar-pedido"); // Aplica a classe CSS
finalizarBtn.addEventListener("click", finalizarPedido);

// Adicionar o botão ao final da seção de produtos
document.querySelector(".produtos").appendChild(finalizarBtn);







