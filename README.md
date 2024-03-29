<h1 align="center">📱 Login App</h1>

# 🖥️ Projeto
-  Este é um aplicativo simples de login desenvolvido em React Native. Ele permite que os usuários façam login em uma conta usando um nome de usuário e senha.

---
<div style="max-width: 800px; margin: 0 auto; align: center;">
  <img src="https://github.com/pcaldi/login-app/assets/114869399/a70c39db-e4f7-41b4-92ac-0615e3e31d2c" width="20%" />
  <img src="https://github.com/pcaldi/login-app/assets/114869399/632097ce-53cf-4173-877c-420eed6e7d4d" width="20%" />
  <img src="https://github.com/pcaldi/login-app/assets/114869399/5162389f-e840-454b-be04-fc39d3089fe7" width="20%" />
  <img src="https://github.com/pcaldi/login-app/assets/114869399/6903b3c9-c8af-4d7a-8a46-b77544ded261" width="20%" />
  <img src="https://github.com/pcaldi/login-app/assets/114869399/be7953a8-154d-4aa5-baf0-37ca80a605d6" width="20%" />
  <img src="https://github.com/pcaldi/login-app/assets/114869399/63074a60-3a76-4334-a4fc-45c8f4f763b5" width="20%" />
  <img src="https://github.com/pcaldi/login-app/assets/114869399/713ec23c-d1e2-4ed5-aa2a-37899fddc173" width="20%" />
  <img src="https://github.com/pcaldi/login-app/assets/114869399/827d213b-ffd5-4b7d-a50c-394ba1158010" width="20%" />
  <img src="https://github.com/pcaldi/login-app/assets/114869399/91365786-d33d-48ab-9d1d-274e87d45845" width="20%" />
  <img src="https://github.com/pcaldi/login-app/assets/114869399/fd52be26-36e5-4010-8079-baa2e4a9ef3f" width="20%" />
</div>

---
# 🚀 Funcionalidades
- Tela de login com campos de entrada para nome de usuário e senha.
- Validação dos campos de entrada para garantir que sejam preenchidos corretamente.
- Navegação para a tela dashboard após o login bem-sucedido.
- Tela de listar usuários.
- Funcionalidade de cadastrar o usuário.
- Funcionalidade de recuperar a senha do usuário,
enviando para o mesmo um e-mail com um token para a recuperação da senha.
- Tela de Perfil do usuário.
- Edição do usuário.
- Edição da foto do usuário.
- Opção de logout para deslogar da conta.


---

## 🛠️ Tecnologias utilizadas
* [React Native](https://reactnative.dev/)
* [Typescript](https://www.typescriptlang.org/)
* [Expo](https://expo.dev/)
* [Axios](https://github.com/axios/axios)
* [React Navigation](https://reactnavigation.org/)
* [Yup](https://github.com/jquense/yup)
* [Toast Message](https://github.com/calintamas/react-native-toast-message)
* [Dropdown Picker](https://www.npmjs.com/package/react-native-dropdown-picker)
* [AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/)
* [Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)


---
## 🖥️ Requisitos

- Node.js 20 ou superior.
- Expo.
- API ( Este aplicativo se comunica com uma API RESTful para autenticação de usuários.)

## 🎡 Rodando o projeto API

```bash
# Execute o comando git clone para realizar o clone do repositório
$ git clone https://github.com/pcaldi/api_node.git
# ou execute
$ git clone pcaldi/api_node.git
# Entre na pasta do repositório clonado
$ cd api_node
```
## 〰️ Dependências e inicialização da API:

- Criar a base de dados "pcaldi" no MySQL
- Alterar as credenciais do banco de dados no arquivo .env
- Para a funcionalidade recuperar senha funcionar, é necessário alterar as credencias do servidor de envio de e-mail no arquivo .env

```bash
## instalar dependências
$ npm install
# Executar as migrations
$ npx sequelize-cli db:migrate
# Executar as seeders
$ npx sequelize-cli db:seed:all
# Rodar o projeto
$ node app.js
# Rodar o projeto utilizando nodemon
$ npx nodemon app.js
```
---

## 🎡 Rodando o projeto

```bash
# Execute o comando git clone para realizar o clone do repositório
$ git clone https://github.com/pcaldi/login-app.git
# ou execute
$ git clone pcaldi/login-app.git
# Entre na pasta do repositório clonado
$ cd login-app
```

## 〰️ Dependências e inicialização:

```bash
## instalar dependências
$ npm install
# inicializar expo
$ npx expo start
```

---

## 👨🏻‍💻 Autor

<a href="https://github.com/pcaldi">
 <img style="border-radius: 50%;" src="https://github.com/pcaldi.png" width="100px;" alt=""/>
 <br />
 <sub><b>Paulo Caldi</b></sub></a> <a href="https://github.com/pcaldi" title="emoji">🙋🏻</a>
 <br />

[![LinkedIn Badge](https://img.shields.io/badge/-Paulo-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/pcaldi/)](https://www.linkedin.com/in/pcaldi/)
[![GMail Badge](https://img.shields.io/badge/-pcaldi@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:pcaldi@gmail.com)](mailto:pcaldi@gmail.com)


---

