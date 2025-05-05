# Auto Controle

## Instalar o Docker

- Faça a instalação do [Docker](https://www.docker.com).

- **Subindo Container com Mysql**
    Caso você já tenha o mysql instalado, tudo que você precissará é descobrir o seu endereço de IP e adiciona-lo como DB_HOST e preencher corretamente os campos do arquivo .env localizado na pasta ./api.

    Caso não tenha, você terá que criar um container para rodar o banco de dados, para isso, abra o Terminal e execute o comando a seguir, Substituindo todas as variaveis que estão com "<<>>":
        `docker run -d --name mysql-standalone -e MYSQL_ROOT_PASSWORD=<<ROOTPASSWORD>> -e MYSQL_DATABASE=auto_controle -e MYSQL_USER=<<USE NAME>> -e MYSQL_PASSWORD=<<USER PASSWORD>>  -p 3306:3306 mysql:8.0`

    Após isso, vocẽ vai precisar conectar esse container com a network do software, rodando esse comando:
        `docker network connect auto-controle_auto-controle-network mysql-standalone`

## Como Rodar

Configure o arquivo **.env.exemple**, deletando a extenção .exemple e preenchendo os dados com os dados do seu banco de dados.
vá ao arquivo index.js localizado em **./api/index.js** e descomente a linha 13.

Com todo o setup pronto, você só precisa rodar o comando:
`docker-compose up`
Que irá subir 2 containers novos, com o sistema.

Assim que terminar a execução e ele ficar esperando os containers atualizarem, seu cursor vai ficar piscando como se fosse para digitar algo, você deverá **comentar novamente a linha 13.**
Agora é só acessar o app, em [site](http://localhost:5173).
