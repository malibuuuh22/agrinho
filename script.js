// Aguarda o carregamento do DOM para garantir que todos os elementos existem
document.addEventListener("DOMContentLoaded", () => {
    inicializarDataAtual();
    configurarNewsletter();
    configurarFavoritosNoticias();
});

/**
 * 1. ATUALIZA A DATA NO TOPO DO SITE
 * Substitui o texto estático por uma data real e formatada.
 */
function inicializarDataAtual() {
    const dataTopBar = document.querySelector(".bg-agroGreen div.hidden");
    if (dataTopBar) {
        const hoje = new Date();
        const opcoes = { year: 'numeric', month: 'long', day: 'numeric' };
        // Formata para: "3 de junho de 2026 • Atualizado em tempo real"
        const dataFormatada = hoje.toLocaleDateString('pt-BR', opcoes);
        dataTopBar.innerHTML = `${dataFormatada} • Atualizado em tempo real`;
    }
}

/**
 * 2. GERENCIAMENTO DA NEWSLETTER
 * Valida o e-mail e simula o cadastro com uma mensagem de sucesso.
 */
function configurarNewsletter() {
    const btnAssinar = document.querySelector("footer button");
    const inputEmail = document.querySelector("footer input[type='email']");

    if (btnAssinar && inputEmail) {
        btnAssinar.addEventListener("click", (e) => {
            e.preventDefault(); // Evita o recarregamento da página
            
            const email = inputEmail.value.trim();

            // Validação simples de e-mail
            if (email === "") {
                alert("Por favor, insira um endereço de e-mail.");
                return;
            }

            if (!validarEmail(email)) {
                alert("Por favor, insira um e-mail válido (ex: nome@dominio.com).");
                return;
            }

            // Simulação de sucesso
            btnAssinar.textContent = "✓ Cadastrado!";
            btnAssinar.classList.remove("bg-agroLightGreen", "hover:bg-green-600");
            btnAssinar.classList.add("bg-emerald-700");
            inputEmail.disabled = true;
            inputEmail.classList.add("opacity-50");

            // Mensagem de boas-vindas personalizada
            alert(`Obrigado! O e-mail ${email} foi cadastrado com sucesso. Você receberá nosso boletim sustentável semanal.`);
        });
    }
}

// Função auxiliar para validar a estrutura do e-mail
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * 3. INTERATIVIDADE NAS NOTÍCIAS (Favoritar / Ler Depois)
 * Adiciona um botão discreto de "marcador" nas últimas notícias.
 */
function configurarFavoritosNoticias() {
    // Seleciona os cards das últimas notícias
    const cardsNoticias = document.querySelectorAll(".grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4 > div");

    cardsNoticias.forEach((card) => {
        // Cria dinamicamente um botão de favoritos para cada notícia
        const btnFavorito = document.createElement("button");
        btnFavorito.innerHTML = "🔖 Ler depois";
        btnFavorito.className = "mt-3 text-xs font-semibold text-gray-500 hover:text-agroEarth transition duration-200 flex items-center gap-1 focus:outline-none";
        
        // Insere o botão dentro da área de texto do card
        const divTexto = card.querySelector(".p-4");
        if (divTexto) {
            divTexto.appendChild(btnFavorito);
        }

        // Evento de clique para alternar o estado de "salvo"
        btnFavorito.addEventListener("click", (e) => {
            e.stopPropagation(); // Evita que o clique dispare eventos no card pai
            
            const jaSalvo = btnFavorito.getAttribute("data-salvo") === "true";

            if (!jaSalvo) {
                btnFavorito.setAttribute("data-salvo", "true");
                btnFavorito.innerHTML = "📌 Salvo para ler depois";
                btnFavorito.className = "mt-3 text-xs font-bold text-agroEarth flex items-center gap-1 focus:outline-none";
            } else {
                btnFavorito.setAttribute("data-salvo", "false");
                btnFavorito.innerHTML = "🔖 Ler depois";
                btnFavorito.className = "mt-3 text-xs font-semibold text-gray-500 hover:text-agroEarth transition duration-200 flex items-center gap-1 focus:outline-none";
            }
        });
    });
}
