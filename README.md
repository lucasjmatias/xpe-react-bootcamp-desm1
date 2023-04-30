# Bootcamp React - DESM1 - Desafio do Módulo 1

Desafio do módulo 1 do bootcamp react, Pós-graduação em Desenvolvimento Full Stack - XP Educação

## Atividade

Construção de um Dashboard com elementos gráficos apresentando os números da Covid-19 a ser consumido de uma API, utilizando JavaScript puro e HTML.

- [x] Implementar um JavaScript puro, HTML e CSS, uma aplicação para apresentação dos números da COVID-19 de um determinado país para um período de datas. A URL base para consumo da API com os dados da COVID é https://api.covid19api.com/. As respectivas rotas serão descritas nas atividades subsequentes.

- [x] Na **Home** de sua aplicação devem ser apresentados os números globais, até a data corrente, retornados pela API na rota “/summary”

  - [x] **KPIs**: Total de Confirmados, Total de Mortes e Total Recuperados.
  - [x] **Pizza**: Novos Confirmados, Novas Mortes e Novos Recuperados
  - [x] **Barras**: Pareto com o Top 10 no número de mortes por país.

- [x] Na página **País** devem ser apresentadas as informações diárias por País.

  - [x] **Filtros**: Data Início, Data Fim, País (combo retornado pela rota “/coutries”), Dados (Casos Confirmados, Número de Mortes e Casos Recuperados) e o um botão para aplicar os filtros selecionados
  - [x] **Gráfico de Linhas**: Apresentação diária dos números do tipo de dados selecionados pelo filtro (Confirmados, Mortes ou Recuperados). Apresentar no gráfico a linha com o número médio correspondente aos números apresentados na curva diária.
  - [x] **KPIs**: Total de Confirmados, Total de Mortes e Total de Recuperados para o país selecionado.

## Dicas

> A página inicial carregará as informações globais da rota “/summary”  
> Na página das informações diárias por país, utilizei o Brasil como país default.  
> Os números diários não são fornecidos já calculados pela API. Será necessário realizar um cálculo com as informações que a API disponibiliza
