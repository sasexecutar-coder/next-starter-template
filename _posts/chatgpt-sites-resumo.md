---
title: "ChatGPT Sites: o que é e como funciona (resumo)"
excerpt: "Um resumo em português da documentação do ChatGPT Sites: como criar, controlar o acesso, publicar versões e quais são os limites do serviço em beta."
coverImage: "/assets/blog/chatgpt-sites/cover.jpg"
date: "2026-10-07T12:00:00.000Z"
author:
  name: Sas Executar
  picture: "/assets/blog/authors/default.svg"
ogImage:
  url: "/assets/blog/chatgpt-sites/cover.jpg"
type: "artigo"
---

O **Sites** é um recurso do ChatGPT que cria, hospeda, refina e compartilha sites, aplicativos web e jogos. A ideia é sair de um pedido em linguagem natural, ou de um projeto que você já tem, para uma página publicada, sem montar um processo de deploy à parte. Este texto é um resumo, escrito com as minhas palavras, da documentação oficial. Para detalhes e valores atuais, consulte sempre a fonte.

## Disponibilidade

O Sites está em **beta público** e vale para os planos Plus, Pro, Business, Enterprise e Edu. Existem limites de uso por plano. Ao atingir um limite, você pode ficar impedido de criar um Site novo, adicionar armazenamento ou manter um Site muito acessado como público, mas continua podendo editar e gerenciar os que já existem.

## Como começar

1. **Descreva o Site:** público, objetivo, comportamento e as informações que ele deve usar. Para ativar o fluxo, use a palavra "website" no pedido ou mencione `@Sites`.
2. **Revise:** confira o conteúdo, o comportamento e o tratamento dos dados.
3. **Refine:** peça ajustes e anexe arquivos ou imagens quando ajudar.
4. **Gerencie e compartilhe:** volte à tela do Sites, escolha quem pode acessar e envie o link.

Para um projeto existente, o pedido é simples: pedir que o Sites verifique a compatibilidade, faça as mudanças necessárias e devolva a URL.

## Versões e publicação

A publicação tem duas etapas separadas:

- **Salvar uma versão:** gera uma versão pronta para publicar, ligada ao commit de Git usado na build, quando o projeto é local.
- **Publicar uma versão:** coloca a versão no ar e informa a URL de produção.

Atenção: **toda URL do Sites é de produção**. Se você quer revisar antes de ir ao ar, peça para salvar a versão sem publicar.

## Que tipo de site cabe

| Necessidade | O que pedir |
| --- | --- |
| Site de conteúdo ou landing page | Um Site sem estado persistente |
| Registros, progresso ou pontuação | Banco relacional (D1) |
| Imagens, documentos, áudio ou vídeo enviados | Armazenamento de objetos (R2) |
| Arquivos com metadados pesquisáveis | D1 para os metadados e R2 para os arquivos |
| Site interno que precisa saber quem é o usuário | Identidade de usuário do workspace |
| Login público ou provedor externo | Site com autenticação |

Não peça armazenamento durável para estado temporário, como o tema escolhido ou um aviso dispensado. Peça para dados que o usuário espera que o site lembre.

## Quem pode ver o seu Site

Um Site novo começa restrito ao dono e aos administradores do workspace. Dependendo da conta, as opções incluem usuários ou grupos específicos, convidados externos, qualquer pessoa do workspace e qualquer pessoa na internet, esta última só quando a publicação pública está habilitada. Em workspaces Enterprise, ela vem desligada por padrão.

Algumas observações úteis:

- **Convidados externos** podem abrir e usar o Site, mas não viram membros do workspace nem editores.
- **Editores** só existem dentro do mesmo workspace e podem ler os dados do banco do Site, então convide apenas quem merece confiança. O dono precisa fazer a primeira publicação.
- Remover um convite não retira o acesso que a pessoa tem por outra regra, como o compartilhamento público ou do workspace.
- É possível acrescentar **Sign in with ChatGPT** a um Site público, para recursos como progresso salvo, mantendo o acesso aberto a quem não entrou. As decisões de autorização devem ficar no código do servidor.

## Segredos, URL e domínio próprio

Variáveis de ambiente e segredos são configurados nas configurações do Site, nunca em prompts, arquivos anexados ou no conteúdo. Depois de mudar um valor, peça para publicar de novo a versão aprovada.

O dono pode trocar a URL hospedada pelo ChatGPT, e o endereço antigo passa a redirecionar para o novo. Onde estiver disponível, também é possível conectar um **domínio próprio** que você já possua: o Sites não registra domínios, então você precisa poder editar os registros DNS. Domínios próprios não estão disponíveis em workspaces Enterprise no lançamento.

## Dados de outros aplicativos

Em workspaces com o recurso habilitado, um Site privado ao workspace pode carregar dados dos aplicativos conectados de cada visitante, como um painel de tarefas que mostra as suas tarefas para você e as do colega para ele. Cada pessoa entra com o ChatGPT e escolhe o que autoriza. Compartilhar o Site não dá acesso às suas contas conectadas.

## Antes de compartilhar

- Revise textos, imagens, links, formulários e arquivos enviados.
- Confirme que não há informação confidencial ou segredos expostos.
- Teste o Site como o visitante real, incluindo acesso e login.
- Se o Site coleta dados pessoais, cumpra as leis de privacidade aplicáveis e explique o que é coletado.
- Escolha a opção de compartilhamento mais restrita que atenda ao público.

Para tirar um Site do ar sem apagá-lo, restrinja o acesso a você mesmo. Para apagar de vez, use a opção de excluir. **A exclusão é permanente.**

## Limites e usos não suportados

Há HTTP, HTTPS e WebSockets, mas não conexões TCP brutas. O banco D1 tem limite de 10 GB por Site, e o R2 não tem limite fixo de armazenamento. No lançamento, não há residência de dados.

Não use o Sites para dados de saúde protegidos, dados de cartão de pagamento, público com menos de 13 anos, transações financeiras, malware, phishing, nem para se passar por pessoas ou organizações.

## Fonte

Resumo baseado na documentação oficial do ChatGPT Sites. Para as regras e os limites vigentes, veja o artigo do [Help Center da OpenAI](https://help.openai.com/articles/20001339) e a documentação em learn.chatgpt.com. Como o serviço está em beta, os detalhes podem mudar.
