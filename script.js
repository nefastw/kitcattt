// --- CONFIGURAÇÃO DO ÁUDIO ---
const audio = new Audio();
let indiceAtual = 0;
const volumeMaximo = 0.45; // Volume final (50%)

// Playlist com os nomes dos seus arquivos na pasta audio/
const playlist = [
    { src: "audio/foiassim.mp3" },
    { src: "audio/rosaserimas.mp3" },
    { src: "audio/nightslikethis.mp3" }
];

function carregarMusica(indice) {
    const musica = playlist[indice];
    audio.src = musica.src;
    // Removida a alteração de document.title para manter o original do HTML
}

// Função de Fade In suave
function fadeIn(elementoAudio, duracaoSegundos) {
    elementoAudio.volume = 0;
    const intervalo = 0.1; 
    const passo = volumeMaximo / (duracaoSegundos / intervalo);

    const timer = setInterval(() => {
        if (elementoAudio.volume < volumeMaximo) {
            elementoAudio.volume = Math.min(elementoAudio.volume + passo, volumeMaximo);
        } else {
            clearInterval(timer);
        }
    }, intervalo * 1000);
}

// --- FUNÇÃO PRINCIPAL (DISPARADA PELO CLIQUE NO ENVELOPE) ---
function abrirEnvelope() {
    const envelope = document.getElementById('meuEnvelope');
    const conteudo = document.getElementById('main-content');

    // 1. Inicia a animação visual do envelope
    envelope.classList.add('open');

    // 2. Lógica do Áudio com Fade In
    carregarMusica(indiceAtual);
    audio.play().then(() => {
        fadeIn(audio, 4); // Aumenta o som gradualmente em 4 segundos
    }).catch(error => console.log("Erro ao tocar áudio:", error));

    // 3. Mostra o conteúdo principal após 1 segundo
    if (conteudo) {
        setTimeout(() => {
            conteudo.classList.add('show');
        }, 1000);
    }
}

// Próxima música automática
audio.onended = function() {
    indiceAtual = (indiceAtual + 1) % playlist.length;
    carregarMusica(indiceAtual);
    audio.volume = volumeMaximo; 
    audio.play();
};

// --- LÓGICA DAS PARTÍCULAS (CHUVA DE ÍCONES) ---
function criarParticula() {
    const imagensPersonagens = [
        'https://cdn.discordapp.com/attachments/1448831843595063358/1463605206045692061/1769020982557.png?ex=69727011&is=69711e91&hm=f08355a422989aaeec863724671b0b482a211262b5e7b61815a9eff0c10bd11d&',
        'https://cdn.discordapp.com/attachments/1448831843595063358/1463605206443884737/1769021012252.png?ex=69727011&is=69711e91&hm=294dccc605b8e90ee719c88c038c888c86c3cbd5f9af198684e0ed53449fd4a3&',
        'https://cdn.discordapp.com/attachments/1365431048741326941/1463606361135906856/1769021332765.png?ex=69727124&is=69711fa4&hm=360b80fdfd059a74c070b98d0a022710e89cf91bbd034e6809d70ffc9fec32f6&',
        'https://cdn.discordapp.com/attachments/1365431048741326941/1463606918504513760/1769021471698.png?ex=697271a9&is=69712029&hm=47b2dd3b57f7ae8e64d5bd14efee615591d3c9b6ee93304a89190c25116545d7&'
    ];

    const particula = document.createElement('img');
    particula.src = imagensPersonagens[Math.floor(Math.random() * imagensPersonagens.length)];
    
    particula.style.position = 'absolute';
    particula.style.left = Math.random() * 100 + 'vw';
    particula.style.top = '-60px'; 
    
    const tamanho = Math.random() * 30 + 30;
    particula.style.width = tamanho + 'px';
    particula.style.height = 'auto';
    
    particula.style.transition = 'transform 7s linear, opacity 7s linear';
    particula.style.zIndex = '1'; 
    particula.style.opacity = '0.8';
    particula.style.pointerEvents = 'none';
    particula.style.filter = 'drop-shadow(2px 2px 0 white) drop-shadow(-2px -2px 0 white)';

    document.body.appendChild(particula);

    setTimeout(() => {
        particula.style.transform = `translateY(110vh) rotate(${Math.random() * 720 - 360}deg)`;
        particula.style.opacity = '0';
    }, 100);

    setTimeout(() => {
        particula.remove();
    }, 7100);
}

// Inicia a chuva de partículas
setInterval(criarParticula, 800);
