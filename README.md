# Auto Controle

Siga o passo a passo abaixo para executar esse programa.

## Instalando o Git

- Acesse o site [git](https://git-scm.com/) e faça o download clicando no botão **Download for Windows**

## Instalando o Docker

- Acesse o site [docker](https://www.docker.com/).
- Clique em Download Docker Desktop e selecione seu sistema operacional.
- Faça uma conta para utilizar.

## Clonando Repositorio

- Abra o terminal usando o comando `Win+R` e buscando por cmd, ou pesquisando terminal na barra de pesquisa do windows.
- Use o comando `git clone https://github.com/LittleDanilo/auto-controle.git`

## Rodando o programa

- Duplique o arquivo `.env.example` que esta na pasta raiz do projeto e altere as variaveis do arquivo.
- Renomeie o arquivo para `.env` apenas.
- Abra o terminal novamente e navegue para a pasta raiz do projeto, utilizando o comando **cd auto-controle**
- Execute o comando `docker-compose up` para inicializar o programa.
- Agora é só acessar o site clicando [aqui](http://localhost:5173);

## Encerrando execução

- Precione `Ctrl + C` no terminal, e depois rode o comando `docker-compose down`
