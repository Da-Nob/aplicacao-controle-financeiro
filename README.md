# Controle Financeiro com Calendário

Este projeto é um aplicativo web simples de controle financeiro pessoal, desenvolvido com React. A ideia principal é permitir que o usuário registre seus gastos do dia a dia em um calendário mensal.

Cada dia do calendário pode receber anotações de gastos, contendo nome da compra, descrição e valor. Os dias que possuem despesas cadastradas ficam destacados visualmente, facilitando a identificação dos dias em que houve algum gasto. No final do mês, o sistema exibe o valor total gasto.

## Objetivo do Projeto

O objetivo deste projeto é ajudar no controle dos gastos pessoais de forma simples e visual. A aplicação funciona como um bloco de notas financeiro organizado por datas, permitindo acompanhar melhor quanto foi gasto e com o quê.

Além disso, o projeto também serve como prática de desenvolvimento front-end utilizando React, manipulação de estados, componentes, eventos, armazenamento local e organização de código.

## Funcionalidades

- Exibição de calendário mensal
- Navegação entre os meses
- Cadastro de gastos por dia
- Registro do nome da compra
- Registro da descrição da compra
- Registro do valor gasto
- Destaque visual nos dias que possuem gastos
- Listagem dos gastos cadastrados em cada dia
- Cálculo do total gasto no mês
- Armazenamento dos dados no navegador

## Tecnologias Utilizadas

- React
- Vite
- JavaScript
- HTML
- CSS
- LocalStorage

## Como Executar o Projeto

Primeiro, clone o repositório:

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git

Entre na pasta do projeto:

cd nome-do-repositorio

Instale as dependências:

npm install

Execute o projeto:

npm run dev

Depois, abra o link exibido no terminal no navegador.

Normalmente será algo como:

http://localhost:5173/
Estrutura do Projeto
src/
│
├── components/
│   ├── Calendar.jsx
│   ├── DayModal.jsx
│   ├── ExpenseForm.jsx
│   └── ExpenseList.jsx
│
├── utils/
│   ├── calendarUtils.js
│   └── storage.js
│
├── App.jsx
├── main.jsx
└── index.css
Como o App Funciona

Na tela inicial, o usuário visualiza o calendário do mês atual. Ao clicar em um dia, é aberta uma tela para cadastrar os gastos daquele dia.

Cada gasto possui:

Nome da compra
Descrição
Valor
Data

Quando um dia possui gastos cadastrados, ele é marcado no calendário com um destaque visual. O sistema também soma automaticamente todos os gastos do mês e exibe o total na tela principal.

Exemplo de Uso

Imagine que o usuário gastou R$ 35,00 em um lanche no dia 10 de abril. Ele pode clicar no dia 10, cadastrar o nome da compra como "Lanche", adicionar uma descrição e informar o valor.

Depois disso, o dia 10 ficará marcado no calendário, e o valor será somado ao total mensal.

Melhorias Futuras

Algumas melhorias que podem ser adicionadas futuramente:

Editar gastos cadastrados
Excluir gastos
Separar gastos por categoria
Criar gráficos mensais
Filtrar gastos por tipo
Adicionar modo escuro
Criar versão mobile
Adicionar login de usuário
Salvar dados em banco de dados
Exportar relatório mensal
Status do Projeto

🚧 Projeto em desenvolvimento.

Autor

Desenvolvido por Daniel Noberto.