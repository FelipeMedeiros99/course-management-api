# API de Gerenciamento de Cursos

Bem-vindo à API de gerenciamento de cursos! Esta API foi desenvolvida com NestJS e oferece endpoints para o gerenciamento de cursos, usuario e carrinho de compras.

URL Base
A URL base para acessar a API com a instância na núvem é:

https://gerenciamento-de-cursos-backend.onrender.com

Localmente, ela está na porta 5000:
localhost:5000/


## Atenção
O servidor utilizado para o backend e armazenamento do banco de dados é hospedado na Render com uma licença gratuita. Devido a isso, pode haver momentos em que o servidor entra em hibernação, fazendo com que a primeira requisição demore a ser respondida, mas após a primeira requisição, o servidor encerra seu ciclo de hibernação e começa a funcionar de forma satisfatória e eficiente.


## Requisitos

- **Node.js**: Certifique-se de ter o Node.js instalado. Recomendado a versão LTS.
- **npm** ou **yarn**: Gerenciador de pacotes para instalar as dependências.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/FelipeMedeiros99/Gerenciamento-de-cursos-backend.git

2. Navegue até o diretório do projeto:

   ```bash
    cd plataforma-curso-backend


4. Instale as dependências:

    ```bash
    npm install
    // ou
    yarn install


## Configuração 

1. Crie um arquivo .env na raiz do projeto e adicione a URL base do banco de dados e da porta :


    ```
    LINK_DATABASE=postgresql://render_db_dr38_user:0Hl6oox5KwVOv9P5Z7M0oLl1dVPUIje3@dpg-crg8l4jv2p9s73a9r9s0-a.virginia-postgres.render.com/render_db_dr38

    PORT=5000

## Endpoints

### Login
**POST/login:**
- Deve obrigatoriamente receber um corpo no formato:

```json
{
    "nome": "fulaono"
}
```
- O servidor irá verificar se o nome informado já está cadastrado, em caso negativo, irá cadastrá-lo e retornar com os seus dados

- O servidor responde com um status 202 e um objeto no formato 

```json
{
  "id": 23,
  "nome": "Diego Santos"
}
``` 

### Cursos
**GET/cursos:**

- Rota destinada à busca dos cursos disponíveis.

- Retorna um array de objetos, contendo todos os cursos cadastrados na plataforma, no formato:

```json 
[
  {
    "id": 3,
    "nome": "Curso de Desenvolvimento de Jogos",
    "preco": "399.99",
    "preco_com_desconto": "349.99",
    "carga_horaria": "50 horas",
    "conteudo": "Curso sobre criação e desenvolvimento de jogos usando Unity e C#.",
    "url_foto": "https://hotmart.s3.amazonaws.com/product_pictures/a70b4aad-9700-42b4-9331-803b2a4ba911/5dc64f37c83bd.jpeg"
  }
]
```
**POST/cursos:**

- Rota destinada ao cadastro de um novo curso.

- O frontend deve enviar um corpo no formato:
```json 
{
    "nome": "Curso de Marketing em Mídias Sociais",
    "url_foto": "https://example.com/curso-marketing-midias-sociais.jpg",
    "preco": 199.99,
    "preco_com_desconto": 159.99,
    "carga_horaria": "25 horas",
    "conteudo": "Curso sobre estratégias e ferramentas para marketing em plataformas de redes sociais."
}
```

- O servidor devolverá um array contendo todos os cursos, incluindo o novo curso que foi adicionado. 

**PUT/cursos:**

- Rota dedicada à edição de cursos. Altera as informações presentes em um curso.

- O id do curso deve ser enviado, para que o servidor consiga identificar o curso que será alterado

- Deve enviar um corpo no formato:

```json
{
    "id": 1,
    "nome": "Curso de Programação",
    "preco": "199.99",
    "preco_com_desconto": "149.99",
    "carga_horaria": "30 horas",
    "conteudo": "Neste curso, você aprenderá os fundamentos da programação, incluindo variáveis, estruturas de controle, funções e muito mais.",
    "url_foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR3cE8l8oZ9kbeYARoBfCHzHafRIm7qY4Qlw&s"
}
```

**POST/carrinho:** 

- Rota destinada à adicionar cursos ao carrinho do usuário

- Deve enviar um corpo no formato:

```json
{
    "usuario_id": 12,
    "curso_id": 4
}
```
- receberá como resposta um status 202

**DELETE/carrinho:** 

- Rota destinada à remoção de um curso do carrinho

- Essa requisição deve ser feita através de querys, de forma que o formato seja:

```
   carrinho?id=3&usuario_id=1
```

onde o id se refere ao id do carrinho, e o usuario_id ao id do próprio usuário.


**GET/carrinho/id:**

- rota destinada à consulta de produtos presentes no carrinho, retornando todos os carrinhos do usuário presentes.

- Deve ser passado o id do usuário

- o servidor responde com um array contendo todos os cursos do usuário que estão no carrinho

**PUT/carrinho:**

- Rota destinada à edição do status de compra do usuario, confirmando a compra do curso.

- Usa querys para efetuar a consulta, devendo seguir o formato:

```
   /carrinho?id=4&usuario_id=1
```
- retorna um array contendo todos os produtos do carrinho, inclusive o que acabou de ser alterado.


## Link para a documentação do front-end:
https://github.com/FelipeMedeiros99/Gerenciamento-de-cursos-frontend.git

