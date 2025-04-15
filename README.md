# Auto Controle

## Como Rodar
- **Instalar o Docker**
    Faça a instalação do [Docker]{https://www.docker.com/} seguindo o passo a passo da documentação.

- **Subindo Container com Mysql**
    Caso você já tenha o mysql instalado, tudo que você precissará é descobrir o seu endereço de IP e adiciona-lo como DB_HOST.

    Caso não tenha, você terá que criar um container para rodar o banco de dados, para isso, abra o Terminal e execute o comando a seguir:
        `docker run -d --name mysql-standalone -e MYSQL_ROOT_PASSWORD=rootpassword -e MYSQL_DATABASE=auto_controle -e MYSQL_USER=user -e MYSQL_PASSWORD=userpassword  -p 3306:3306 mysql:8.0`
