# Fute app

O projeto tem como objetivo a ideação e desenvolvimento de um produto que facilite a organização de peladas de futebol. O nosso público alvo são os gestores das peladas, que realizam as atividades hoje de uma forma muito manual e em ferramentas diversas. 
O nosso produto trará uma centralização e organização de todas as informações necessárias para a pelada em um só local. O nosso diferencial para outras soluções será o foco no gestor da pelada. Outras soluções, como o Chega+ por exemplo, precisam de um engajamento de todas as pessoas envolvidas na pelada, para coletar estatísticas, notas, entre outras coisas. No caso do nosso cliente, já tentaram aplicar essa solução na pelada, mas não funcionou por falta de participação, não é uma coisa cultural da pelada. Hoje, apenas as pessoas da organização pelada realiza o preenchimento das informações, e vai continuar dessa forma. 
Os usuários da pelada poderão apenas visualizar informações importantes, como estatísticas mensais e anuais, times sorteados de cada semana, entre outras coisas.

Acessos:
  - Clickup https://app.clickup.com/9010156395/v/s/90100401129
No clickup é possível encontrar: atividades do projeto, backlog do produto com histórias do usuário, link para o protótipo inicial no figma, design e arquitetura do software, documentação dos testes criados, modelo ER, especificações técnicas e documento de postmortem do primeiro ciclo do projeto

Deploy back: http://146.190.14.27:3001/
Deploy front: https://fute-9r7ikn7mc-lucanevess87.vercel.app/admin/437b299f-38c7-4ae9-9e69-2d740569e08a

# Time:
  - Guilherme Ribeiro (grcc) - Gerente do projeto *Líder
  - Luca Neves (lnb2) - Líder tećnico
  - Breno Alexandre Santos (baas) - Desenvolvedor
  - Eduardo Teles (edot) - Desenvolvedor e designer
  - Josef Jaeger (jjb) - Desenvolvedor


# How to run

1. Install all the dependencies at package.json by running "yarn"

2. Create a ".env" file and copy and paste this:

```dotenv

# ###### GENERAL SETTINGS #######
PROJECT_NAME=boilerplate
NODE_ENV=development

# ###### SERVER SETTINGS #######
SERVER_PORT=3001

# ###### DATABASE SETTINGS #######
DATABASE_TYPE=postgres
DATABASE_HOST=boilerplate-db
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=docker
DATABASE_DB=boilerplate

# ###### TEST DATABASE SETTINGS #######
DATABASE_TEST_HOST=localhost
DATABASE_TEST_PORT=5433
DATABASE_TEST_USER=postgres
DATABASE_TEST_PASSWORD=docker
DATABASE_TEST_DB=boilerplate-test

DATABASE_URL=${DATABASE_TYPE}://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_DB}

# ###### JWT SETTINGS #######
JWT_ACCESS_SECRET=0551c0ed-6389-46b1-839e-2e28fc191c89 # token for 30sec
JWT_REFRESH_SECRET=92fba49f6912d14733332bb9ebaac1562f51ee685594acf103d71f685f70868b # token for 7 days

```

3. Run the server:

```bash
docker compose up
```

4. In another terminal, run:

```bash
yarn migration
```

5. Have fun!
