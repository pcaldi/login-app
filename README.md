
# 🖥️ Projeto
-  Este é um aplicativo simples de login desenvolvido em React Native. Ele permite que os usuários façam login em uma conta usando um nome de usuário e senha.

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

# 🎥 Demo
---
<p align="center">
  <img height="600" src="./src/assets/demo.gif"/>
</p>

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

## 🖥️ Requisitos

- Node.js 20 ou superior
- Expo

## 🎡 Como rodar o projeto

### Faça o clone do projeto
```
git clone https://github.com/pcaldi/login-app.git
```

### Instale as dependências
```
npm install
```

### Executar o projeto
```
npx expo start
```

### Dependência para navegar entre as telas
```
npm install @react-navigation/native @react-navigation/native-stack
```
```
npx expo install react-native-screens react-native-safe-area-context

```

### Dependência para realizar chamadas na API
```
npm i axios
```

### Dependência para Validação
```
npm i yup
```

### Dependência de feedback visual para o usuário
```
npm install --save react-native-toast-message
```

### Dependência para armazenar dados no dispositivo
```
npx expo install @react-native-async-storage/async-storage
```

### Biblioteca para adicionar Tab Navigation
```
npm install @react-navigation/bottom-tabs
```

### Biblioteca para criar o campo SELECT
```
npm install react-native-dropdown-picker
```

### Biblioteca que permite escolher imagens da galeria do dispositivo do usuário ou diretamente da câmera do dispositivo.
```
npx expo install expo-image-picker
```
