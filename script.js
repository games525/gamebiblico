/* =========================================================
   AVENTURAS DA BÍBLIA – script.js
   Seus sprites NÃO são configurados aqui: veja as variáveis
   --img-menu, --img-leitura e --img-celebracao em style.css.
   ========================================================= */
'use strict';

/* ---------- 1. CONTEÚDO (histórias + quizzes) ---------- */
/* "correta" = posição (0, 1 ou 2) da alternativa certa. */
const HISTORIAS = [
  {
    id: 'noe',
    titulo: 'A Arca de Noé',
    icone: '🚢',
    cor: '#3d8bff',
    paragrafos: [
      'Há muito, muito tempo, vivia um homem bondoso chamado Noé. Ele amava a Deus e cuidava com carinho da sua família.',
      'Um dia, Deus disse: "Vai chover muito! Construa uma grande arca de madeira." Noé obedeceu e começou a trabalhar: toc, toc, toc!',
      'Quando a arca ficou pronta, entraram dois animais de cada tipo: dois leões, dois elefantes, dois passarinhos e muitos outros. A família de Noé entrou também.',
      'A chuva caiu por muitos dias. A arca flutuou sobre as águas, e todos ficaram seguros lá dentro.',
      'Quando a chuva parou, Noé soltou uma pomba. Ela voltou com um ramo de oliveira no bico. A terra estava secando! Então Deus pintou um lindo arco-íris no céu como promessa de cuidado.'
    ],
    quiz: [
      { pergunta: 'Quem construiu a grande arca?',
        opcoes: ['Davi', 'Noé', 'Daniel'], correta: 1 },
      { pergunta: 'Por que Noé construiu a arca?',
        opcoes: ['Para passear pelo mar', 'Para guardar brinquedos', 'Porque Deus pediu, para proteger todos da chuva'], correta: 2 },
      { pergunta: 'O que a pomba trouxe no bico?',
        opcoes: ['Um ramo de oliveira', 'Uma flor vermelha', 'Um peixinho'], correta: 0 }
    ]
  },
  {
    id: 'davi',
    titulo: 'Davi e Golias',
    icone: '🪨',
    cor: '#ff5c5c',
    paragrafos: [
      'Davi era um menino pastor. Todos os dias ele cuidava das ovelhas. Ele era pequeno, mas tinha um coração corajoso e confiava em Deus.',
      'Naquela época, um gigante chamado Golias assustava o exército de Israel. Ele era enorme e gritava todos os dias! Ninguém tinha coragem de enfrentá-lo.',
      'Davi disse: "Eu vou lutar! Deus está comigo." O rei ofereceu uma armadura pesada, mas Davi preferiu usar a sua funda e cinco pedrinhas lisas do rio.',
      'Davi girou a funda, lançou a pedra e... POF! Acertou Golias, que caiu no chão. O povo ficou muito feliz e aprendeu que, com Deus, até os pequenos podem ser corajosos.'
    ],
    quiz: [
      { pergunta: 'Qual era o trabalho de Davi?',
        opcoes: ['Cuidar de ovelhas', 'Construir barcos', 'Cozinhar pão'], correta: 0 },
      { pergunta: 'O que Davi usou para vencer Golias?',
        opcoes: ['Uma espada enorme', 'Uma funda e uma pedrinha', 'Uma armadura pesada'], correta: 1 },
      { pergunta: 'Por que Davi não teve medo do gigante?',
        opcoes: ['Porque era maior que ele', 'Porque ganhou um presente', 'Porque confiava em Deus'], correta: 2 }
    ]
  },
  {
    id: 'daniel',
    titulo: 'Daniel na Cova dos Leões',
    icone: '🦁',
    cor: '#ff9f1c',
    paragrafos: [
      'Daniel era um homem sábio e honesto. Ele orava a Deus três vezes por dia, e o rei gostava muito dele.',
      'Alguns homens ficaram com inveja. Eles fizeram o rei criar uma lei: ninguém poderia orar a ninguém, a não ser ao rei. Mas Daniel continuou orando a Deus, como sempre fazia.',
      'Por causa disso, Daniel foi colocado na cova dos leões famintos. O rei ficou tão triste que nem conseguiu dormir.',
      'De manhãzinha, o rei correu até a cova e chamou: "Daniel, Deus te protegeu?" E Daniel respondeu: "Sim! Deus enviou um anjo que fechou a boca dos leões." O rei ficou muito feliz!'
    ],
    quiz: [
      { pergunta: 'O que Daniel fazia três vezes por dia?',
        opcoes: ['Cantava', 'Orava a Deus', 'Caçava leões'], correta: 1 },
      { pergunta: 'Onde Daniel foi colocado?',
        opcoes: ['Na cova dos leões', 'Em uma arca', 'No topo de uma montanha'], correta: 0 },
      { pergunta: 'Quem fechou a boca dos leões?',
        opcoes: ['O rei', 'Um soldado', 'Um anjo de Deus'], correta: 2 }
    ]
  },
  {
    id: 'criacao',
    titulo: 'A Criação do Mundo',
    icone: '🌍',
    cor: '#9b6bff',
    paragrafos: [
      'No começo, tudo era escuridão. Então Deus disse: "Haja luz!" E a luz apareceu. Foi o primeiro dia.',
      'Depois, Deus criou o céu, o mar e a terra seca. Fez crescer plantas, flores e árvores cheias de frutos.',
      'No quarto dia, Deus fez o Sol, a Lua e as estrelas. No quinto dia, encheu os mares de peixes e o céu de passarinhos.',
      'No sexto dia, Deus criou os animais da terra e também as pessoas, Adão e Eva. Deus olhou tudo o que tinha feito e viu que era muito bom.',
      'No sétimo dia, Deus descansou.'
    ],
    quiz: [
      { pergunta: 'O que Deus criou primeiro?',
        opcoes: ['A luz', 'Os peixes', 'As estrelas'], correta: 0 },
      { pergunta: 'O que Deus criou no quinto dia?',
        opcoes: ['Adão e Eva', 'Peixes e passarinhos', 'Flores e árvores'], correta: 1 },
      { pergunta: 'O que Deus fez no sétimo dia?',
        opcoes: ['Criou o Sol', 'Construiu uma arca', 'Descansou'], correta: 2 }
    ]
  }
];

/* ---------- 2. ESTADO ---------- */
const CHAVE_SALVAR = 'aventuras-biblia-concluidas';
const estado = {
  historia: null,
  pergunta: 0,
  acertos: 0,
  respondeu: false,
  concluidas: new Set()
};

const $ = (seletor) => document.querySelector(seletor);

/* Progresso salvo no navegador (se não puder salvar, o jogo continua normalmente) */
function carregarProgresso() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_SALVAR) || '[]');
    if (Array.isArray(salvo)) salvo.forEach((id) => estado.concluidas.add(id));
  } catch (e) { /* ignora */ }
}
function salvarProgresso() {
  try { localStorage.setItem(CHAVE_SALVAR, JSON.stringify([...estado.concluidas])); } catch (e) { /* ignora */ }
}

/* ---------- 3. NAVEGAÇÃO ENTRE TELAS (com transição suave) ---------- */
let telaAtual = $('#tela-menu');

function mostrarTela(id, focoId) {
  const nova = document.getElementById(id);
  if (!nova || nova === telaAtual) return;
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();

  const antiga = telaAtual;
  antiga.classList.remove('visivel');          // 1) a tela antiga some suavemente
  telaAtual = nova;

  setTimeout(() => {
    antiga.hidden = true;
    nova.hidden = false;
    void nova.offsetWidth;                     // força o navegador a aplicar o estado inicial
    nova.classList.add('visivel');             // 2) a nova tela aparece suavemente
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const alvo = focoId && document.getElementById(focoId);
    if (alvo) alvo.focus({ preventScroll: true });
  }, 300);
}

/* ---------- 4. MENU ---------- */
function montarMenu() {
  const lista = $('#lista-fases');
  lista.innerHTML = '';
  HISTORIAS.forEach((h, i) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'carta';
    btn.style.setProperty('--cor-carta', h.cor);
    btn.dataset.id = h.id;
    const feita = estado.concluidas.has(h.id);
    btn.innerHTML =
      `<span class="icone" aria-hidden="true">${h.icone}</span>` +
      `<span>Fase ${i + 1}<br>${h.titulo}</span>` +
      `<span class="status">${feita ? '⭐ Concluída' : 'Nova!'}</span>`;
    li.appendChild(btn);
    lista.appendChild(li);
  });
  $('#total-estrelas').textContent = estado.concluidas.size;
}

/* ---------- 5. HISTÓRIA ---------- */
function abrirHistoria(id) {
  estado.historia = HISTORIAS.find((h) => h.id === id);
  $('#historia-titulo').textContent = estado.historia.titulo;
  const caixa = $('#historia-texto');
  caixa.innerHTML = '';
  estado.historia.paragrafos.forEach((texto) => {
    const p = document.createElement('p');
    p.textContent = texto;
    caixa.appendChild(p);
  });
  mostrarTela('tela-historia', 'historia-titulo');
}

function lerEmVozAlta() {
  if (!('speechSynthesis' in window)) return;
  const sintese = window.speechSynthesis;
  if (sintese.speaking) { sintese.cancel(); return; }
  const fala = new SpeechSynthesisUtterance(
    estado.historia.titulo + '. ' + estado.historia.paragrafos.join(' ')
  );
  fala.lang = 'pt-BR';
  fala.rate = 0.85;
  sintese.speak(fala);
}

/* ---------- 6. QUIZ ---------- */
function iniciarQuiz() {
  estado.pergunta = 0;
  estado.acertos = 0;
  mostrarPergunta();
  mostrarTela('tela-quiz', 'quiz-titulo');
}

function mostrarPergunta() {
  const quiz = estado.historia.quiz;
  const q = quiz[estado.pergunta];
  estado.respondeu = false;

  $('#quiz-titulo').textContent = 'Quiz: ' + estado.historia.titulo;
  $('#quiz-progresso').textContent = `Pergunta ${estado.pergunta + 1} de ${quiz.length}`;
  $('#quiz-barra').style.width = `${(estado.pergunta / quiz.length) * 100}%`;
  $('#quiz-pergunta').textContent = q.pergunta;

  const feedback = $('#quiz-feedback');
  feedback.textContent = '';
  feedback.className = 'feedback';
  $('#btn-proxima').hidden = true;

  const caixa = $('#quiz-opcoes');
  caixa.innerHTML = '';
  q.opcoes.forEach((texto, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'opcao';
    b.dataset.indice = i;
    b.innerHTML = `<span class="letra">${'ABC'[i]}</span><span></span>`;
    b.lastChild.textContent = texto;
    caixa.appendChild(b);
  });
}

function responder(botao) {
  if (estado.respondeu) return;
  estado.respondeu = true;

  const q = estado.historia.quiz[estado.pergunta];
  const escolhida = Number(botao.dataset.indice);
  const acertou = escolhida === q.correta;
  const botoes = document.querySelectorAll('.opcao');

  botoes.forEach((b) => (b.disabled = true));
  botoes[q.correta].classList.add('certa');

  const feedback = $('#quiz-feedback');
  if (acertou) {
    estado.acertos++;
    feedback.textContent = 'Muito bem! Resposta certa! 🎉';
    feedback.classList.add('ok');
  } else {
    botao.classList.add('errada');
    feedback.textContent = 'Quase! A resposta certa está marcada em verde.';
    feedback.classList.add('erro');
  }

  const ultima = estado.pergunta === estado.historia.quiz.length - 1;
  const proxima = $('#btn-proxima');
  proxima.textContent = ultima ? 'Ver resultado' : 'Próxima';
  proxima.hidden = false;
  proxima.focus({ preventScroll: true });
}

function avancar() {
  estado.pergunta++;
  if (estado.pergunta < estado.historia.quiz.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

/* ---------- 7. RESULTADO + ANIMAÇÃO DE CELEBRAÇÃO ---------- */
function mostrarResultado() {
  const total = estado.historia.quiz.length;
  const perfeito = estado.acertos === total;
  const pontos = estado.acertos * 10;

  const palco = $('#palco-celebracao');
  const sprite = palco.querySelector('.sprite-celebracao');

  $('#resultado-pontos').textContent = `Você acertou ${estado.acertos} de ${total} · ${pontos} pontos`;

  if (perfeito) {
    $('#resultado-titulo').textContent = 'Parabéns! 🏆';
    $('#resultado-msg').textContent = 'Você acertou todas as perguntas e ganhou uma estrela!';
    $('#btn-tentar').hidden = true;
    $('#btn-reler').hidden = true;

    estado.concluidas.add(estado.historia.id);
    salvarProgresso();
    montarMenu();

    // ▼ Liga a celebração: o sprite aparece, pula e corre pela tela
    palco.hidden = false;
    sprite.classList.remove('animando');
    void sprite.offsetWidth;                   // reinicia a animação CSS
    sprite.classList.add('animando');
    soltarConfetes();
  } else {
    $('#resultado-titulo').textContent = 'Quase lá! 💪';
    $('#resultado-msg').textContent = 'Foi uma boa tentativa! Que tal reler a história e tentar de novo? Você consegue!';
    $('#btn-tentar').hidden = false;
    $('#btn-reler').hidden = false;

    palco.hidden = true;
    sprite.classList.remove('animando');
  }

  $('#quiz-barra').style.width = '100%';
  mostrarTela('tela-resultado', 'resultado-titulo');
}

function soltarConfetes() {
  const area = $('#confetes');
  const cores = ['#ffd23f', '#ff5c5c', '#3d8bff', '#2fb344', '#9b6bff', '#ff9f1c'];
  for (let i = 0; i < 40; i++) {
    const c = document.createElement('span');
    c.className = 'confete';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = cores[i % cores.length];
    c.style.animationDuration = 2.5 + Math.random() * 2.5 + 's';
    c.style.animationDelay = Math.random() * 0.8 + 's';
    area.appendChild(c);
    setTimeout(() => c.remove(), 6500);
  }
}

/* ---------- 8. EVENTOS ---------- */
document.addEventListener('click', (e) => {
  const carta = e.target.closest('.carta');
  if (carta) return abrirHistoria(carta.dataset.id);

  const opcao = e.target.closest('.opcao');
  if (opcao) return responder(opcao);

  const nav = e.target.closest('[data-acao]');
  if (nav) {
    if (nav.dataset.acao === 'menu') mostrarTela('tela-menu');
    if (nav.dataset.acao === 'historia') mostrarTela('tela-historia', 'historia-titulo');
  }
});

$('#btn-ouvir').addEventListener('click', lerEmVozAlta);
$('#btn-ir-quiz').addEventListener('click', iniciarQuiz);
$('#btn-proxima').addEventListener('click', avancar);
$('#btn-tentar').addEventListener('click', iniciarQuiz);
$('#btn-reler').addEventListener('click', () => mostrarTela('tela-historia', 'historia-titulo'));

/* ---------- 9. INÍCIO ---------- */
if (!('speechSynthesis' in window)) $('#btn-ouvir').hidden = true;
carregarProgresso();
montarMenu();
