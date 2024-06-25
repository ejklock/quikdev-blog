# Descrição da Stack e Instruções para Execução de Testes

## a. Descrição da Stack Utilizada

### Linguagens e Frameworks

- **Versão do Node.JS (backend e frontend):* v20.14.0*
- **Back-end:**
  - **Linguagem:** TypeScript
  - **Framework:** NestJS
    - **Motivo da Escolha:** NestJS é escolhido por sua robustez e estrutura modular, facilitando o desenvolvimento de APIs escaláveis e testáveis. Além disso, seu suporte nativo ao TypeScript permite um desenvolvimento mais seguro e eficiente.

- **Front-end:**
  - **Linguagem:** JavaScript/TypeScript
  - **Framework:** React
    - **Motivo da Escolha:** React é conhecido por sua eficiência em renderizar interfaces de usuário dinâmicas e por seu vasto ecossistema de bibliotecas e ferramentas que facilitam o desenvolvimento de aplicações web modernas.

### Banco de Dados

- **Banco de Dados:** MySQL
  - **Motivo da Escolha:** MySQL é um sistema de gerenciamento de banco de dados relacional amplamente utilizado e confiável, conhecido por seu desempenho, robustez e flexibilidade.

### Tecnologia de Containerização

- **Docker:** Utilizado para criar contêineres de aplicação isolados, garantindo que o ambiente de desenvolvimento e produção sejam consistentes.
- **Docker Compose:** Utilizado para orquestrar múltiplos contêineres Docker, facilitando o gerenciamento do banco de dados e da aplicação em diferentes ambientes.

### Pacotes Adicionais

- **TypeORM:** ORM para TypeScript que facilita a integração com o MySQL e a manipulação de dados de forma eficiente e tipada.
- **Axios:** Biblioteca para fazer requisições HTTP de forma simples e eficiente, usada principalmente no front-end.

## b. Instruções para Subir o Sistema e Executar os Testes

### 1. Preparar o Ambiente

Certifique-se de ter o Docker e o Docker Compose instalados na sua máquina.

### 2. Subir o Banco de Dados

1. Navegue até o diretório do projeto.
2. Execute o comando abaixo para iniciar o banco de dados MySQL utilizando o Docker Compose:

   ```bash
   docker-compose up -d

### 3. Subir a api
1. Navege até quikdevblog-api
2.  ```cp  env.example .env ```
3. Rode ```npm install ```
4. Rode as migrations ```npm run typeorm:migration:run ```
5. Rode ```npm run start:dev ```
6. Acessar ```[http://localhost:3333](http://localhost:3333) ```


### 3. Subir o Front
1. Navege até quikdevblog-web
2.  ```cp  env.example .env ```
3. Rode ```npm install ```
4. Rode ```npm run dev ```
5. Acessar ```[http://localhost:3333](http://localhost:5173/) ```
6. Crie um usuario 
