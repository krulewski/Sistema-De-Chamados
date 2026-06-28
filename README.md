# 👨‍💻 Painel de Suporte ao Cliente - Helpdesk Dev Jr

Aplicação web interativa em formato de Kanban para gerenciamento de chamados de suporte técnico, permitindo criar, monitorar o progresso em três etapas, filtrar por níveis de urgência e gerenciar o histórico.

---

## 🚀 Acesse o projeto

- 🔗 Link do Painel no Ar: https://sistema-de-chamados-pi.vercel.app/

---

## ⚙️ Funcionalidades

* ➕ **Abertura de Chamados:** Cadastro rápido com nome do cliente, descrição do problema e nível de prioridade.
* 📋 **Fluxo Kanban Completo:** Gerenciamento visual do ciclo de vida do chamado (Novos ➡️ Em Atendimento ➡️ Resolvidos).
* ↩️ **Controle de Fluxo Recuado:** Possibilidade de devolver um chamado em atendimento de volta para a fila de novos.
* 🎯 **Filtro Avançado por Prioridade:** Visualização segmentada instantânea (Alta 🔴, Média 🟡, Baixa 🟢 ou Todos 🌐).
* 🧹 **Gerenciamento de Histórico:** Opção discreta para excluir chamados específicos ou limpar toda a coluna de resolvidos em massa (com travas de segurança/confirmação).
* 💾 **Persistência de Dados:** Salvamento automático de todas as ações no navegador para não perder nada ao atualizar a página.
* ☀️/🌙 **Modo Escuro (Dark Mode):** Alternador de tema nativo com memória (lembra da escolha do usuário no próximo acesso).

---

## 🧪 Tecnologias utilizadas

### Frontend (Arquitetura Vanilla)

* **HTML5:** Estruturação semântica do painel e formulários.
* **CSS3:** Layout moderno e responsivo baseado em CSS Grid e Flexbox, utilizando Variáveis CSS para a transição suave de temas.
* **JavaScript Puro (ES6+):** Manipulação dinâmica da DOM, escutadores de eventos, funções de alta ordem (como `.filter()`, `.find()`, `.some()`) e persistência com a Web Storage API.

---

## 🧠 Aprendizados

Neste projeto, eu pratiquei extensivamente os pilares fundamentais do desenvolvimento web:

* **Lógica de Programação Avançada com JS Puro:** Manipulação complexa de estados e arrays sem depender de frameworks (como React ou Vue).
* **Manipulação de DOM:** Criação, renderização e exclusão de elementos HTML dinamicamente com base em dados de um array.
* **Web Storage (LocalStorage):** Transformação, salvamento e leitura de dados complexos usando `JSON.stringify` e `JSON.parse`.
* **Clean Code:** Criação de funções auxiliares e reutilizáveis (como a centralização da mudança de status dos cartões).
* **UI/UX e Arquitetura CSS:** Criação de interfaces modernas baseadas no padrão Dashboard/SaaS e implementação de temas (Light/Dark mode) escaláveis com `:root`.
* **Deploy Automatizado:** Hospedagem na nuvem usando a Vercel integrada ao GitHub.

---

## 📦 Como rodar o projeto localmente

Como o projeto foi desenvolvido em arquitetura Vanilla (Web nativa), ele não possui dependências pesadas e roda direto no navegador!

1. Clone ou baixe este repositório.
2. Navegue até a pasta do projeto.
3. Abra o arquivo `index.html` em qualquer navegador (Chrome, Edge, Firefox, Safari).

## 📌 Status do projeto

🚧 Em evolução — a base lógica e visual foi concluída com sucesso. Futuramente, pretendo integrá-lo a uma API real (Node.js/Express) e um banco de dados em nuvem para transformá-lo em uma aplicação multiusuário.
