# **To-Do List**

Uma aplicação web para gerenciamento de tarefas que permite que usuários registrem, atualizem e excluam suas tarefas de forma intuitiva e eficiente. Cada usuário pode visualizar apenas suas próprias tarefas, com o uso de **JWT** para autenticação e **Redis** para otimizar o cache das tarefas criadas.

**Link da aplicação em produção:** [https://www.felipedeluna.top/](https://www.felipedeluna.top/)

---

## **Funcionalidades**

- Registro e login de usuários com autenticação JWT.
- Adição, atualização e remoção de tarefas.
- Tarefas vinculadas ao usuário autenticado.
- Redis para cache das tarefas.
- MongoDB para persistência dos dados.
- Deploy em produção com Nginx e HTTPS.

---

## **Tecnologias Utilizadas**

- **Backend:** Node.js + Express.js
- **Frontend:** HTML + BootStrap + AJAX(JavaScript)  
- **Banco de Dados:** MongoDB  
- **Cache:** Redis  
- **Autenticação:** JWT (JSON Web Token)  
- **Gerenciamento de Processos:** PM2
- **Servidor Web:** Nginx
- **Deploy:** Google Cloud (VM Debian)

---

## **Rotas da API**

### **Autenticação**

#### **POST /api/usuario/cadastrar**
- **Descrição:** Registra um novo usuário.
- **Body**
  ```json
  { 
    "email": "user@example.com", 
    "senha": "123456" 
  }
  
#### **POST /api/usuario/logar** 
- **Descrição:** Faz login e retorna o token JWT.
- **Body**
  ```json
  { 
    "email": "user@example.com", 
    "senha": "123456" 
  }

### **Tarefas**

#### **GET /api/tasks/**.
- **Descrição:** Faz login e retorna o token JWT.
- **Header**
  ```json
  { 
    "Authorization": "Bearer <tokenJwt>" 
  }

#### **POST /api/tasks/**
- **Descrição:** Adiciona uma nova tarefa
- **Header**
  ```json
  { 
    "Authorization": "Bearer <tokenJwt>" 
  }
- **Body**
  ```json
  { 
    { "titulo": "Nova tarefa" }
  }

#### **PUT /api/tasks/:id**
- **Descrição:** Atualiza o status de uma tarefa.
- **Header**
  ```json
  { 
    "Authorization": "Bearer <tokenJwt>" 
  }
- **Body**
  ```json
  { 
    { "status": "concluido" }
  }

#### **DELETE /api/tasks/:id**
- **Descrição:** Faz login e retorna o token JWT.
- **Header**
  ```json
  { 
    "Authorization": "Bearer <tokenJwt>" 
  }

---

## **Segurança**

- **JWT** => Para a autenticação.
- **HTTPS** => Configurado com Nginx para tráfego mais seguro.
- **Sanitização de entradas** => Para evitar injeção de código.

---

## **Conclusão**

Este projeto é uma solução completa para gerenciar tarefas, usando Redis para cache eficiente e MongoDB para persistência. A autenticação JWT garante que apenas usuários autorizados possam acessar suas tarefas, e o deploy com Nginx e Google Cloud oferece uma solução robusta e segura para produção.


