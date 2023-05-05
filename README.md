# Projeto para estudo de Nodejs Avançado

## Por que estou criando esse projeto?
Este projeto é para estudo do Nodejs, nele eu busco me tornar uma profissinal mais qualificado para o mercado de trabalho e especialmente para meu projeto de vida.

## Por onde começar?
Para facilitar os novatos assim como eu vou descrever a baixo como realizar as configurações iniciais do projeto para que funcione adequatamente.
Vamos lá.

## Primeiros passos
- Instalar o nodejs instalado no computador
- Instalar o Yarn acessando o link: [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)

## Ferramentas utilizadas para ajudar no desenvolvimento
- ESLint
- Prettier
- EditorConfig

### Instalar as depencias necessárias para o bom funcionamento do projeto.
- Nodedomn como dependência de desenvolvimento
  - comando:
    - yarn add nodemon -D
    - yarn add eslint -D
    - yarn add prettier eslint-config-prettier eslint-plugin-prettier -D

### Verifi9car se o projeto está de acordo do padrão eslint
- yarn eslint --fix src --ext .js

# Nesse projeto vou usar o padrão ORM
## Devemos criar uma migration com comando:
-   yarn sequelize migration:create --name=create-nome_da_tabela_no_plural
-   yarn sequelize db:migrate