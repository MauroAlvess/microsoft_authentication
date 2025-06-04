# Manual de Utilização

Bem-vindo !

Este guia o ajudará a configurar e executar tanto o frontend (desenvolvido em Angular) quanto o backend (desenvolvido em .NET 8) da sua aplicação em seu ambiente local.

## 1. Pré-requisitos Essenciais

### 1.1. Node.js e npm
O Node.js é necessário para o frontend Angular, e o npm gerencia as dependências.

- **Download:** [Node.js Oficial](https://nodejs.org)
- **Instalação:**
  - Baixe versão 22 do node.js e execute o instalador apropriado para seu sistema operacional.
  - O npm será instalado automaticamente.

### 1.2. .NET 8 SDK
O .NET 8 SDK permite compilar e executar o backend.

- **Download:** [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- **Instalação:** Baixe e execute o instalador para seu sistema operacional.

## 2. Configuração e Execução da Aplicação

### 2.1. Clonar o Repositório

```bash
git clone https://github.com/MauroAlvess/microsoft_authentication
cd microsft-authetication
```

## Backend 

1. **Navegue para o diretório da API**:
    ```bash
    cd azure-cloud-api
    ```

2. **Restaurar dependências**:
    ```bash
    dotnet restore
    ```

3. **Configurar Microsoft Entra ID**:
   - Verifique `appsettings.Development.json` e ajuste as credenciais do **Client ID** e **Tenant ID**.

4. **Executar o backend**:
    ```bash
    dotnet run
    ```
    - O backend será iniciado. Você verá no terminal um endereço como `https://localhost:44351`.

---

## Frontend 

1. **Navegue para o diretório do frontend**:
    ```bash
    cd ../azure-cloud-ui
    ```

2. **Instalar as dependências do Angular**:
    ```bash
    npm install
    ```
   **Configurar Microsoft Entra ID**:
   - Verifique `msl.config.ts` e ajuste as credenciais do **Client ID**.

4. **Executar o frontend**:
    ```bash
    ng serve
    ```

**Acessando a Aplicação**

1. **Abra seu navegador**.
2. **Digite**: http://localhost:4200

---

