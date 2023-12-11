# Projeto A3 Sistemas Distribuitos

## Instalação das dependencias

### Banco de Dados (PostgreSQL)
1. Baixe o PostgreSQL no [site oficial](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).
2. Escolha a versão mais recente e execute o arquivo de instalação.
3. Siga as instruções de instalação.
4. Para a senha, utilize: `62442`.
5. Se solicitado um login, utilize `postgres`.
6. Conclua a instalação.
7. No menu Iniciar, pesquise por `pgadmin` e execute.

### Visual Studio Code (VS Code)
1. Baixe o VS Code no [site oficial](https://code.visualstudio.com/download).
2. Escolha a versão desejada e execute o arquivo de instalação.
3. Siga as instruções de instalação.
4. Conclua a instalação.

### Node.js
1. Baixe o Node.js em [nodejs.org](https://nodejs.org/en/download).
2. Instale o Node.js em sua máquina.

## Inicialização do Projeto

Para iniciar o projeto localmente, siga estas etapas:

1. Abra o terminal na raiz do projeto.
2. Para instalar as dependências do projeto, utilize o comando:
    ```bash
    npm install
    ```

3. Após a instalação das dependências, inicie o projeto com:
    ```bash
    npm start

# Mais informações informações

## Endpoints Principais

### Usuários

- `GET` `localhost:3001/api/usuarios`
  - Lista todos os usuários.

- `GET` `localhost:3001/api/usuarios/{id_usuario}`
  - Procura um usuário pelo ID.

- `POST` `localhost:3001/api/usuarios`
  - Cadastra um usuário.

- `POST` `localhost:3001/api/usuarios/login`
  - Valida uma tentativa de login.

- `PUT` `localhost:3001/api/usuarios`
  - Edita um usuário.

- `DELETE` `localhost:3001/api/usuarios/{id_usuario}`
  - Deleta um usuário pelo ID.


### Jogos
    
- `GET` `localhost:3001/api/jogos`
  - Lista todos os jogos.

- `GET` `localhost:3001/api/jogos/{id_jogo}`
  - Procura um jogo por ID.

- `GET` `localhost:3001/api/jogos/listarProdutosPorEstoque`
  - Lista os jogos em ordem de menor estoque.

- `POST` `localhost:3001/api/jogos`
  - Cadastra um jogo.

- `PUT` `localhost:3001/api/jogos`
  - Edita um jogo.

- `DELETE` `localhost:3001/api/jogos/{id_jogo}`
  - Deleta um jogo pelo ID.


### Compras

- `GET` `localhost:3001/api/compras`
  - Lista todas as compras.

- `GET` `localhost:3001/api/compras/{id}`
  - Procura uma compra por ID.

- `GET` `localhost:3001/api/compras/getInfoGastosUsuario/{id_usuario}`
  - Retorna as estatísticas de consumo de um usuário pelo ID.

- `GET` `localhost:3001/api/compras/getProdutosCompradosPorCliente/{id_usuario}`
  - Retorna a lista dos produtos comprados por um usuário pelo ID dele.

- `GET` `localhost:3001/api/compras/maisComprados`
  - Lista os produtos mais comprados.

- `POST` `localhost:3001/api/compras`
  - Cadastra a compra de um produto vinculada a um usuário.

- `PUT` `localhost:3001/api/compras`
  - Edita uma compra.

- `DELETE` `localhost:3001/api/compras/{id_compra}`
  - Deleta uma compra pelo ID.


# Projeto A3 Sistemas Distribuitos

## Instalação das dependencias

### Banco de Dados (PostgreSQL)
1. Baixe o PostgreSQL no [site oficial](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).
2. Escolha a versão mais recente e execute o arquivo de instalação.
3. Siga as instruções de instalação.
4. Para a senha, utilize: `62442`.
5. Se solicitado um login, utilize `postgres`.
6. Conclua a instalação.
7. No menu Iniciar, pesquise por `pgadmin` e execute.

### Visual Studio Code (VS Code)
1. Baixe o VS Code no [site oficial](https://code.visualstudio.com/download).
2. Escolha a versão desejada e execute o arquivo de instalação.
3. Siga as instruções de instalação.
4. Conclua a instalação.

### Node.js
1. Baixe o Node.js em [nodejs.org](https://nodejs.org/en/download).
2. Instale o Node.js em sua máquina.

## Inicialização do Projeto

Para iniciar o projeto localmente, siga estas etapas:

1. Abra o terminal na raiz do projeto.
2. Para instalar as dependências do projeto, utilize o comando:
    ```bash
    npm install
    ```

3. Após a instalação das dependências, inicie o projeto com:
    ```bash
    npm start

# Mais informações informações

## Endpoints Principais

### Usuários

- `GET` `localhost:3001/api/usuarios`
  - Lista todos os usuários.

- `GET` `localhost:3001/api/usuarios/{id_usuario}`
  - Procura um usuário pelo ID.

- `POST` `localhost:3001/api/usuarios`
  - Cadastra um usuário.

- `POST` `localhost:3001/api/usuarios/login`
  - Valida uma tentativa de login.

- `PUT` `localhost:3001/api/usuarios/{id_usuario}`
  - Edita um usuário.

- `DELETE` `localhost:3001/api/usuarios/{id_usuario}`
  - Deleta um usuário pelo ID.


### Jogos
    
- `GET` `localhost:3001/api/jogos`
  - Lista todos os jogos.

- `GET` `localhost:3001/api/jogos/{id_jogo}`
  - Procura um jogo por ID.

- `GET` `localhost:3001/api/jogos/listarProdutosPorEstoque`
  - Lista os jogos em ordem de menor estoque.

- `POST` `localhost:3001/api/jogos`
  - Cadastra um jogo.

- `PUT` `localhost:3001/api/jogos`
  - Edita um jogo.

- `DELETE` `localhost:3001/api/jogos/{id_jogo}`
  - Deleta um jogo pelo ID.


### Compras

- `GET` `localhost:3001/api/compras`
  - Lista todas as compras.

- `GET` `localhost:3001/api/compras/{id_compra}`
  - Procura uma compra por ID.

- `GET` `localhost:3001/api/compras/getInfoGastosUsuario/{id_usuario}`
  - Retorna as estatísticas de consumo de um usuário pelo ID.

- `GET` `localhost:3001/api/compras/getProdutosCompradosPorCliente/{id_usuario}`
  - Retorna a lista dos produtos comprados por um usuário pelo ID dele.

- `GET` `localhost:3001/api/compras/maisComprados`
  - Lista os produtos mais comprados.

- `POST` `localhost:3001/api/compras`
  - Cadastra a compra de um produto vinculada a um usuário.

- `PUT` `localhost:3001/api/compras/{id_compra}`
  - Edita uma compra.

- `DELETE` `localhost:3001/api/compras/{id_compra}`
  - Deleta uma compra pelo ID.


## JSON para Teste

#### Usuários
json:

```
{
    "id": 1,
    "nome": "Catureba",
    "email": "admin@gmail.com",
    "senha": "adminsenha",
    "role": "ADMIN"
}
```
#### Jogos
json:

```
{
    "id": 7,
    "titulo": "Red Dead Redemption 2",
    "descricao": "Ação no velho oeste",
    "preco": "49.99",
    "estoque": 75,
    "plataformas": [
        "PS4",
        "Xbox One",
        "PC"
    ],
    "nota": "4.8",
    "comentarios": [
        "Gráficos impressionantes"
    ],
    "urlImagem": "https://www.techpowerup.com/review/red-dead-redemption-2-fsr-2-community-patch-tested/images/small.png"
}
```

#### Compras
json:
```
{
    "id": 1,
    "id_usuario": 4,
    "id_produto": 2,
}
```