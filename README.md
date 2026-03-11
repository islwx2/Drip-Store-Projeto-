# 🛒 Digital Store - E-commerce Frontend

Este é o projeto front-end de uma loja virtual completa, desenvolvida com React e Vite. O objetivo do projeto é simular a experiência real de um e-commerce, desde a listagem e filtragem de produtos até o fluxo de carrinho e finalização de compra com cálculo de frete.

## 🚀 Funcionalidades Implementadas

O projeto conta com diversas páginas e lógicas dinâmicas de e-commerce:

* **Página Inicial (Home):** Vitrine com produtos em destaque, banners promocionais e navegação rápida por categorias.
* **Catálogo de Produtos:** Página de listagem completa com sistema de **Filtragem** (por categorias como Sneakers, Roupas, Acessórios) e **Ordenação** (Maior e Menor preço).
* **Carrinho de Compras Global:** Utilização da **Context API** (`CartProvider`) para que os produtos adicionados sejam lembrados em qualquer página do site.
* **Gestão de Pedidos:** Tela de "Meus Pedidos" com cálculo automático do valor total (com aplicação de descontos) e opção de excluir itens do carrinho.
* **Checkout Inteligente:** Formulário de finalização de compra integrado com a **API do ViaCEP**. Ao digitar o CEP, o sistema preenche automaticamente os campos de Rua, Bairro e Cidade, liberando o usuário para adicionar apenas o número e complemento.
* **Navegação Fluida (SPA):** Roteamento completo entre as páginas sem recarregar o navegador, utilizando `react-router-dom`.

## 🛠️ Tecnologias e Ferramentas Utilizadas

* **React.js** (Bootstrapped com Vite para maior performance)
* **Tailwind CSS** (Para estilização rápida e responsiva)
* **React Router Dom** (Gerenciamento de rotas da SPA)
* **Context API** (Gerenciamento de estados globais, como o Carrinho)
* **Fetch API** (Consumo de dados externos - ViaCEP)
* **React Icons** (Ícones da interface)

## ⚙️ Como rodar o projeto localmente

1. Clone este repositório:
   ```bash
   git clone <link-do-seu-repositorio>

Atividade desenvolvida em dupla por Islane Costa e Patrício Felício.

Link de deploy: https://projeto-front-end-mini-loja.vercel.app/ 
