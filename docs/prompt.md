# Prompt de Geração da Suíte de Testes com Playwright

Crie uma suíte de testes automatizados usando Playwright em TypeScript para a página de login do site [https://www.saucedemo.com/](https://www.saucedemo.com/).  
A suíte deve seguir as melhores práticas do Playwright e atender aos seguintes requisitos:

## Requisitos Técnicos

### Configuração Geral

- Use `BASE_URL` como constante para a URL do site.
- Utilize `test.beforeEach` para:
  - Navegar para `BASE_URL`.
  - Aplicar `waitForLoadState('domcontentloaded')` para garantir que a página esteja carregada.
  - Inicializar locators reutilizáveis para os elementos principais:
    - Campo de usuário → `getByPlaceholder('Username')`
    - Campo de senha → `getByPlaceholder('Password')`
    - Botão de login → `getByRole('button', { name: 'Login' })`
- Implemente `test.afterEach` para capturar screenshots com nomes baseados no título do teste (`after-[testname].png`).

---

## Testes a Serem Implementados

### Verificar elementos da página de login
- Certifique-se de que os campos de usuário, senha e o botão de login estão visíveis.

### Login inválido
- Insira credenciais inválidas e verifique se a mensagem de erro apropriada é exibida.

### Login válido
- Insira credenciais válidas e verifique o redirecionamento para `/inventory.html`.

### Usuário bloqueado
- Insira credenciais de um usuário bloqueado e verifique a mensagem de erro apropriada.

### Campos vazios
Teste os seguintes cenários:
- Usuário e senha vazios.
- Apenas o campo de senha vazio.
- Apenas o campo de usuário vazio.

### Campo de senha mascarado
- Verifique se o campo de senha está mascarado (`type="password"`).

### Fechar mensagem de erro
- Gere uma mensagem de erro e verifique se ela pode ser fechada e desaparece.

---

## Boas Práticas

- Use assertions web-first (`toBeVisible`, `toHaveURL`, `toHaveAttribute`, etc.).
- Evite timeouts fixos e utilize os mecanismos internos do Playwright.
- Reutilize locators sempre que possível.
- Extraia uma função utilitária `login(page, username, password)` para reduzir repetição.
- Capture screenshots para cada teste e salve na pasta `screenshots/` com nomes descritivos.
- Use `test.describe` para agrupar testes logicamente (por exemplo: "Erros", "Usabilidade").
- Use `test.skip` ou `test.todo` para cenários futuros.

---

## Cenários Futuros

Após implementar os testes acima, sugira até 3 cenários adicionais que poderiam ser testados, como:

- Persistência de sessão após atualização da página.
- Funcionalidade de logout e redirecionamento para a página de login.
- Teste de responsividade em dispositivos móveis e tablets usando `Playwright devices`.

---

## Observações

- O código deve ser limpo, conciso e seguir as melhores práticas descritas na [documentação oficial do Playwright](https://playwright.dev/).
- Evite comentários desnecessários no código gerado.
