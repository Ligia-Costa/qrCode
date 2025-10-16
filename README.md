# Leitor de QR Code em React Native (Expo)

Este é um aplicativo de leitura de QR code desenvolvido com React Native e Expo. O aplicativo utiliza a câmera do dispositivo para escanear QR codes e, caso o conteúdo seja um link, o abre automaticamente no navegador.

## ✨ Funcionalidades

* **Leitura Automática:** Aponte a câmera para um QR code e o aplicativo fará a leitura automaticamente, sem a necessidade de pressionar botões.
* **Abertura de Links:** Se o QR code contiver um link (URL), o aplicativo o abrirá diretamente no navegador padrão do seu dispositivo.
* **Feedback Tátil e Sonoro:** Ao detectar um QR code, o aplicativo emite um som de "beep" e vibra, proporcionando um feedback claro ao usuário.
* **Animação de Leitura:** Uma linha de varredura animada fornece um feedback visual durante o processo de leitura.
* **Interface Limpa:** A interface é simples e intuitiva, focada na experiência do usuário.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

* **React Native:** Framework para desenvolvimento de aplicativos móveis multiplataforma.
* **Expo:** Plataforma e conjunto de ferramentas para construir, implantar e iterar rapidamente em aplicativos React Native.
* **Expo Camera:** Módulo para acessar a câmera do dispositivo e escanear códigos de barras e QR codes.
* **Expo AV:** Módulo para reprodução de áudio.
* **Expo Haptics:** Módulo para controle do feedback tátil (vibração).
* **React Native Reanimated:** Biblioteca para criar animações suaves e fluidas.
* **TypeScript:** Superset do JavaScript que adiciona tipagem estática ao código.

## 🏁 Como Começar

Siga as instruções abaixo para executar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos

* Node.js (versão 18 ou superior)
* npm ou Yarn
* Dispositivo físico com o aplicativo Expo Go instalado ou um emulador/simulador Android/iOS.

### Instalação

1.  **Clone o repositório:**

    ```cmd
    git clone [https://github.com/Ligia-Costa/qrCode.git]
    ```

2.  **Acesse a pasta do projeto:**

    ```cmd
    cd qrCode
    ```

3.  **Instale as dependências:**

    ```cmd
    npm install
    ```

### Executando o Aplicativo

1.  **Inicie o servidor de desenvolvimento do Expo:**

    ```cmd
    npm start
    ```

2.  **Abra o aplicativo:**
    * **No seu dispositivo:** Escaneie o QR code exibido no terminal com o aplicativo Expo Go.
    * **No emulador/simulador:** Pressione `a` para o Android ou `i` para o iOS no terminal onde o servidor do Expo está rodando.

## 📝 Estrutura do Projeto

* `app/index.tsx`: Arquivo principal que contém toda a lógica do leitor de QR code.
* `app/_layout.tsx`: Layout principal do aplicativo, utilizando o `expo-router`.
* `assets/`: Pasta para armazenar imagens, fontes e outros recursos estáticos.
* `package.json`: Arquivo que lista as dependências e scripts do projeto.
* `app.json`: Arquivo de configuração do Expo, onde são definidas as propriedades do aplicativo.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para entrar em contato.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.