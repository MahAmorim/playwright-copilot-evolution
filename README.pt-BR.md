# Testes de Login com Playwright – Evolução Guiada com GitHub Copilot

Este projeto é uma **exploração orientada ao aprendizado** sobre testes automatizados com [Playwright](https://playwright.dev/) e ferramentas de IA como o GitHub Copilot.
Ele demonstra como **refinar prompts de forma iterativa** e usar o Copilot com intenção pode resultar em suítes de testes robustas e escaláveis.

Cada versão (de `v1-basic` até `v5-final`) representa um nível de maturidade crescente, evoluindo de um script funcional até uma solução de qualidade profissional.

---

## 🌟 Objetivo do Projeto

Estudar:

* Como a engenharia de prompts influencia a qualidade do código gerado
* Boas práticas em testes E2E com Playwright
* Como o GitHub Copilot pode ser orientado com arquivos de configuração e estratégias de prompt

> 📁 Veja cada versão na pasta `/playwright-tests/`

---

## 📊 Evolução dos Testes (v1 a v5)

| Versão | Nome do Arquivo       | Descrição                                                                          |
| ------ | --------------------- | ---------------------------------------------------------------------------------- |
| v1     | `v1-basic.spec.ts`    | Código funcional básico com variáveis globais e sem reutilização ou agrupamento    |
| v2     | `v2-fixes.spec.ts`    | Adiciona `afterEach`, melhorias mínimas, ainda sem estrutura                       |
| v3     | `v3-cleanup.spec.ts`  | Adiciona screenshots e melhora o fluxo, mas sem login modularizado                 |
| v4     | `v4-scalable.spec.ts` | Introduz helper de login, agrupamento com `describe()` e ajuste de timeout         |
| v5     | `v5-final.spec.ts`    | Código limpo, reutilizável e profissional com `test.skip` e organização por blocos |

---

## 🗌 Primeiros Passos

### Pré-requisitos

* [Node.js](https://nodejs.org/) instalado
* Instalar as dependências:

  ```bash
  npm install
  npx playwright install
  ```

### Executando os Testes

```bash
npx playwright test               # Executa todos os testes
npx playwright test --headed     # Executa com o navegador visível
npx playwright test --debug      # Modo de depuração
npx playwright show-report       # Abre o relatório HTML
```

---

## 🔢 Testes Incluídos

* **Elementos da tela de login estão visíveis**
* **Login inválido exibe mensagem de erro**
* **Login válido redireciona corretamente**
* **Usuário bloqueado exibe erro apropriado**
* **Campos vazios geram mensagens de erro**
* **Campo de senha está mascarado**
* **Fechamento da mensagem de erro funciona corretamente**

---

## 🧠 Configuração do GitHub Copilot

Este projeto utiliza **instruções personalizadas para o Copilot** com o objetivo de gerar código técnico e limpo em TypeScript.

### 🔧 Configuração do Copilot

```json
{
  "github.copilot.chat.codeGeneration.instructions": [
    {
      "file": "copilot-instructions.md"
    }
  ]
}
```

### 🛠️ Arquivo de Instruções (`copilot-instructions.md`)

```md
You are an expert in TypeScript, Frontend development, and Playwright end-to-end testing.
You write concise, technical TypeScript code with accurate examples and the correct types.

- Always use the recommended built-in and role-based locators (getByRole, getByLabel, etc.)
- Prefer to use web-first assertions whenever possible
- Use built-in config objects like devices whenever possible
- Avoid hardcoded timeouts
- Reuse Playwright locators by using variables
- Follow the guidance and best practices described on playwright.dev
- Avoid commenting the resulting code
```

---

## 🔎 Prompt Utilizado para Gerar a Versão Final (v5)

<details>
<summary>Ver prompt completo</summary>

```md
Crie uma suíte de testes automatizados usando Playwright em TypeScript para a página de login do site https://www.saucedemo.com/. A suíte deve seguir as melhores práticas do Playwright e atender aos seguintes requisitos:

Requisitos Técnicos:
Configuração Geral:

- Use BASE_URL como constante para a URL do site.
- Utilize test.beforeEach para:
  - Navegar para BASE_URL.
  - Aplicar waitForLoadState('domcontentloaded') para garantir que a página esteja carregada.
  - Inicializar locators reutilizáveis para os elementos principais:
    - Campo de usuário → getByPlaceholder('Username')
    - Campo de senha → getByPlaceholder('Password')
    - Botão de login → getByRole('button', { name: 'Login' })
- Implemente test.afterEach para capturar screenshots com nomes baseados no título do teste (after-[testname].png).

Testes a serem implementados:

- Verificar elementos da página de login
- Login inválido
- Login válido
- Usuário bloqueado
- Campos vazios
- Campo de senha mascarado
- Fechar mensagem de erro

Boas Práticas:

- Use assertions web-first (toBeVisible, toHaveURL, toHaveAttribute, etc.)
- Evite timeouts fixos e utilize os mecanismos internos do Playwright
- Reutilize locators sempre que possível
- Extraia uma função utilitária login(page, username, password) para reduzir repetição
- Capture screenshots para cada teste e salve na pasta screenshots com nomes descritivos
- Use test.describe para agrupar testes logicamente (ex: "Erros", "Usabilidade")
- Use test.skip ou test.todo para cenários futuros

Cenários Futuros:

- Persistência de sessão após atualização da página
- Funcionalidade de logout e redirecionamento para a página de login
- Teste de responsividade em dispositivos móveis e tablets usando Playwright devices

Observações:

- O código deve ser limpo, conciso e seguir as melhores práticas descritas na documentação oficial do Playwright
- Evite comentários desnecessários no código gerado
```

</details>

---

## 🌎 Resumo da Configuração do Projeto

* Tempo limite global: `60000ms`
* Modo visual padrão (`headless: false`)
* Delay entre ações: `500ms` (SlowMo)
* Gravação de vídeo: ativada
* Screenshot: apenas em falhas
* Trace: armazenado em falhas
* Browsers: Chromium, Firefox, WebKit

---

## 📂 Estrutura do Projeto

```
/playwright-copilot/
│
├── README.md
├── README.pt-BR.md
│
├── playwright.config.ts
├── package.json
├── package-lock.json
│
├── /playwright-tests/
│   ├── 01-basic.spec.ts
│   ├── 02-fixes.spec.ts
│   ├── 03-cleanup.spec.ts
│   ├── 04-scalable.spec.ts
│   └── 05-final.spec.ts
│
├── /screenshots/
├── /test-results/
├── /playwright-report/
│
├── /docs/
│   ├── prompt-final.md
│   └── copilot-instructions.md
```

---

## 📙 Referências

* [Documentação Playwright](https://playwright.dev)
* [Documentação Copilot](https://docs.github.com/pt/copilot)
* [SauceDemo](https://www.saucedemo.com)
