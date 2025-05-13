# Playwright Login Tests – Guided Evolution with GitHub Copilot

![Playwright](https://img.shields.io/badge/Tested%20with-Playwright-45ba63?logo=playwright)

This project is a **learning-driven exploration** of automated testing using [Playwright](https://playwright.dev/) and AI tools like GitHub Copilot.
It demonstrates how **iteratively refining prompts** and using **Copilot with intention** can lead to robust, maintainable test suites.

Each version (from `v1-basic` to `v5-final`) reflects a level of maturity, progressing from a working script to a production-ready solution.

---

### 🌟 Project Goal
To study:

* How prompt engineering influences the quality of generated test code
* Best practices in Playwright E2E testing
* How GitHub Copilot can be guided with configuration files and prompt strategies

In QA and test automation, most teams start with working tests — few reach reliable, scalable architectures. This project bridges that gap using AI.

> 📁 Check each version in the `/playwright-tests/` folder

---

### 📊 Test Evolution (v1 to v5)

| Version | File Name             | Description                                                                      |
| ------- | --------------------- | -------------------------------------------------------------------------------- |
| v1      | `v1-basic.spec.ts`    | Basic, functional code with global variables and no reuse or grouping            |
| v2      | `v2-fixes.spec.ts`    | Adds `afterEach`, minimal improvements, but still lacks structure                |
| v3      | `v3-cleanup.spec.ts`  | Adds screenshots and improves flow, but still without modular login              |
| v4      | `v4-scalable.spec.ts` | Introduces login helper, `describe()` grouping, proper afterEach, timeout tuning |
| v5      | `v5-final.spec.ts`    | Clean, reusable, professional code with `test.skip` and structured grouping      |



> 💡 Each version solves a specific pain point:
> - v1 → gets things working fast (good for PoC or MVP)
> - v2 → adds debugging value via screenshots
> - v3 → improves resilience and traceability
> - v4 → introduces modularity for reusability
> - v5 → aligns with team-level quality and future growth


---

### Getting Started

#### Prerequisites

* [Node.js](https://nodejs.org/) installed
* Install dependencies:

  ```bash
  npm install
  npx playwright install
  ```

#### Running Tests

```bash
npx playwright test              # Run all tests
npx playwright test --headed     # Run tests with browser visible
npx playwright test --debug      # Debug mode
npx playwright show-report       # View HTML report
```

---

### Tests Included

* **Login page elements are visible**
* **Invalid login shows error**
* **Valid login redirects**
* **Locked-out user shows error**
* **Empty credentials show error**
* **Password field is masked**
* **Dismiss error message**

---

### GitHub Copilot Configuration

This project uses **custom Copilot instructions** to guide the generation of technical and clean TypeScript code.

#### Copilot Settings

```json
{
  "github.copilot.chat.codeGeneration.instructions": [
    {
      "file": "copilot-instructions.md"
    }
  ]
}
```

#### Instruction File (`copilot-instructions.md`)

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

### 🔎 Prompt Used to Generate Final Version (v5)

\[Click to expand]

<details>
<summary>View final prompt</summary>

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
- Use test.describe para agrupar testes logicamente (e.g., "Erros", "Usabilidade")
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

### 🌎 Project Configuration Summary

* Global timeout: `60000ms`
* Headed mode by default (`headless: false`)
* SlowMo: `500ms` delay
* Video recording: `on`
* Screenshot: only on failure
* Trace: retained on failure
* Projects: Chromium, Firefox, WebKit

---

### 📂 Project Structure

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

## 📙 References

* [Playwright Docs](https://playwright.dev)
* [Copilot Docs](https://docs.github.com/en/copilot)
* [SauceDemo](https://www.saucedemo.com)
