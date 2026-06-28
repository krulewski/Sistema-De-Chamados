// 1. MAPEAMENTO: Elementos da tela capturados pelo JavaScript
const formulario = document.getElementById('form-chamado');
const inputCliente = document.getElementById('cliente');
const textareaDescricao = document.getElementById('descricao');
const selectPrioridade = document.getElementById('prioridade');

const listaNovosContainer = document.getElementById('lista-novos');
const listaAtendimentoContainer = document.getElementById('lista-atendimento');
const listaResolvidosContainer = document.getElementById('lista-resolvidos');

const totalNovosContador = document.getElementById('total-novos');
const totalAtendimentoContador = document.getElementById('total-atendimento');
const totalResolvidosContador = document.getElementById('total-resolvidos');
const btnDarkMode = document.getElementById('btn-dark-mode');

// 2. BANCO DE DADOS: Busca dados salvos ou começa com uma lista vazia
let listaDeChamados = JSON.parse(localStorage.getItem('chamados')) || [];
let filtroAtual = 'todos';

// 3. EVENTO: Escutar o envio do formulário
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); 

    const novoChamado = {
        id: Date.now(),
        cliente: inputCliente.value,
        descricao: textareaDescricao.value,
        prioridade: selectPrioridade.value,
        status: 'novo'
    };

    listaDeChamados.push(novoChamado);
    salvarNoNavegador();
    
    renderizarChamados();
    formulario.reset();
});

// 4. FUNÇÃO DE RENDERIZAÇÃO: Desenha os cartões nas colunas corretas
function renderizarChamados() {
    listaNovosContainer.innerHTML = '';
    listaAtendimentoContainer.innerHTML = '';
    listaResolvidosContainer.innerHTML = '';

    const chamadosFiltrados = listaDeChamados.filter(function(chamado) {
        if (filtroAtual === 'todos') return true;
        return chamado.prioridade === filtroAtual;
    });

    chamadosFiltrados.forEach(function(chamado) {
        const cartao = document.createElement('div');
        cartao.classList.add('cartao-chamado', `borda-${chamado.prioridade}`);

        if (chamado.status === 'novo') {
            cartao.innerHTML = `
                <h4>${chamado.cliente}</h4>
                <p>${chamado.descricao}</p>
                <span class="badge badge-${chamado.prioridade}">${chamado.prioridade.toUpperCase()}</span>
                <button class="btn-cartao btn-atender" onclick="atenderChamado(${chamado.id})">Atender ⚙️</button>
            `;
            listaNovosContainer.appendChild(cartao);
        } 
        else if (chamado.status === 'atendimento') {
            // Adicionado cabeçalho com botão para devolver o chamado para "novo"
            cartao.innerHTML = `
                <div class="cartao-header-atendimento">
                    <h4>${chamado.cliente}</h4>
                    <button class="btn-devolver" onclick="devolverChamado(${chamado.id})" title="Devolver para Novos">↩ Voltar</button>
                </div>
                <p>${chamado.descricao}</p>
                <span class="badge badge-${chamado.prioridade}">${chamado.prioridade.toUpperCase()}</span>
                <button class="btn-cartao btn-resolver" onclick="resolverChamado(${chamado.id})">Resolver ✓</button>
            `;
            listaAtendimentoContainer.appendChild(cartao);
        } 
        else if (chamado.status === 'resolvido') {
            cartao.innerHTML = `
                <div class="cartao-header-resolvido">
                    <h4>${chamado.cliente}</h4>
                    <button class="btn-excluir" onclick="excluirChamado(${chamado.id})" title="Excluir histórico">×</button>
                </div>
                <p>${chamado.descricao}</p>
                <div class="status-concluido">✅ Concluído</div>
            `;
            listaResolvidosContainer.appendChild(cartao);
        }
    });

    totalNovosContador.textContent = listaDeChamados.filter(c => c.status === 'novo').length;
    totalAtendimentoContador.textContent = listaDeChamados.filter(c => c.status === 'atendimento').length;
    totalResolvidosContador.textContent = listaDeChamados.filter(c => c.status === 'resolvido').length;
}

// 5. FUNÇÕES DE MUDANÇA DE STATUS (AÇÕES DOS BOTÕES)
function atenderChamado(idDoChamado) {
    alterarStatus(idDoChamado, 'atendimento');
}

function resolverChamado(idDoChamado) {
    alterarStatus(idDoChamado, 'resolvido');
}

// Nova ação: Move o chamado de "atendimento" de volta para "novo"
function devolverChamado(idDoChamado) {
    alterarStatus(idDoChamado, 'novo');
}

function alterarStatus(id, novoStatus) {
    const chamadoEncontrado = listaDeChamados.find(c => c.id === id);
    if (chamadoEncontrado) {
        chamadoEncontrado.status = novoStatus;
        salvarNoNavegador();
        renderizarChamados();
    }
}

// 6. FUNÇÃO PARA FILTRAR POR PRIORIDADE
function filtrarPrioridade(prioridadeSelecionada) {
    filtroAtual = prioridadeSelecionada;
    const botoes = document.querySelectorAll('.btn-filtro');
    botoes.forEach(btn => btn.classList.remove('ativo'));

    const botaoClicado = Array.from(botoes).find(btn => btn.getAttribute('onclick').includes(prioridadeSelecionada));
    if (botaoClicado) {
        botaoClicado.classList.add('ativo');
    }
    renderizarChamados();
}

// 7. FUNÇÃO PARA EXCLUIR DEFINITIVAMENTE UM CHAMADO
function excluirChamado(idDoChamado) {
    const certeza = confirm("Tem certeza que deseja apagar permanentemente este chamado?");
    if (!certeza) return; 

    listaDeChamados = listaDeChamados.filter(c => c.id !== idDoChamado);
    salvarNoNavegador();
    renderizarChamados();
}

// 8. FUNÇÃO PARA LIMPAR TODOS OS RESOLVIDOS
function limparTodosResolvidos() {
    const temResolvidos = listaDeChamados.some(c => c.status === 'resolvido');
    if (!temResolvidos) {
        alert("Não há chamados resolvidos para limpar!");
        return;
    }

    const certeza = confirm("Deseja apagar TODOS os chamados resolvidos do histórico?");
    if (certeza) {
        listaDeChamados = listaDeChamados.filter(c => c.status !== 'resolvido');
        salvarNoNavegador();
        renderizarChamados();
    }
}

function salvarNoNavegador() {
    localStorage.setItem('chamados', JSON.stringify(listaDeChamados));
}

// 9. LÓGICA REVOLUCIONÁRIA: GERENCIAMENTO DO DARK MODE
function alternarTema() {
    // Altera a classe "dark-theme" no elemento <body> do HTML
    document.body.classList.toggle('dark-theme');

    // Salva a preferência no localStorage para persistir
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('tema', 'escuro');
        btnDarkMode.textContent = "☀️ Modo Claro";
    } else {
        localStorage.setItem('tema', 'claro');
        btnDarkMode.textContent = "🌙 Modo Escuro";
    }
}

// Verifica se o usuário já usava o Modo Escuro antes para carregar automaticamente
if (localStorage.getItem('tema') === 'escuro') {
    document.body.classList.add('dark-theme');
    btnDarkMode.textContent = "☀️ Modo Claro";
}

// Inicializa a tela com os dados salvos ao abrir a página
renderizarChamados();