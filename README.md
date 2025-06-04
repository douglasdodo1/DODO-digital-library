DODO Digital Library
DODO Digital Library é uma aplicação web desenvolvida em Ruby on Rails 8.0.2 que funciona
como uma biblioteca digital para cadastro, consulta e gerenciamento de livros, vídeos e artigos.

Tecnologias Utilizadas

- Ruby 3.4.3
- Rails 8.0.2
- PostgreSQL
- Gems principais:
- puma, pg, graphql, bcrypt, kaminari, jwt, pundit
- Testes: rspec-rails, factory_bot_rails, faker, shoulda-matchers
- Segurança e qualidade: brakeman, rubocop-rails-omakase
- Outros: solid_cache, solid_queue, solid_cable, kamal, thruster, bootsnap
  Instalação e Configuração

1.  Clonar o repositório
    git clone <URL_DO_REPOSITORIO>
    cd dodo-digital-library

2.  Instalar dependências
    bundle install

3.  Configurar banco de dados
    Copie e configure config/database.yml (exemplo abaixo):
    default: &default
    adapter: postgresql
    encoding: unicode
    host: hostexample
    username: usernameexample
    password: passwordexample
    pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

    development:
    <<: \*default
    database: example_library_db_development

    test:
    <<: \*default
    database: example_library_db_test

    production:
    <<: \*default
    database:example_db_production
    username: usernameexample
    password: <%= ENV['DATABASE_PASSWORD'] %>

4.  Criar arquivo de segredos config/secrets.yml

    development:
    secret_key_base: sua_chave_secreta
    test:
    secret_key_base: sua_chave_secreta
    production:
    secret_key_base: <%= ENV["SECRET_KEY_BASE"] %>

5.  Criar e migrar banco
    rails db:create db:migrate

6.  Autenticação
    Usuários se autenticam via e-mail e senha. A autenticação usa JWT.
7.  Estrutura de Diretórios (resumo)
    .kamal/
    .ruby-lsp/
    app/
    controllers/
    graphql/
    mutations/
    resolvers/
    types/
    jobs/
    mailers/
    models/
    utils/
    views/
    bin/
    config/
    db/
    lib/
    log/
    public/
    script/
    spec/
    storage/
    test/
    tmp/
    Funcionalidades

8.  estrutura do banco de dados

    - CRUD de Usuários (criar, editar, apagar conta própria)
    - CRUD de Autores (tipo pessoa ou instituição)
    - CRUD de Materiais (livros, artigos, vídeos), associados a autores
    - Busca paginada de materiais por título, autor e descrição, com paginação
      Estrutura do Banco de Dados (principais tabelas)
      Tabela | PK | Campos relevantes
      users | cpf (string) | name, mail, password_digest
      authors | id (bigint) | name
      materials | id (bigint) | title, description, status, author_id, user_cpf
      books | isbn (string)| material_id, page_numbers
      articles | doi (string) | material_id, publication_date, language
      videos | id (bigint) | material_id, duration_minutes
      people | id (bigint) | author_id, birth_date
      institutions | id (bigint) | author_id, city

9.  Testes
    Antes de rodar os testes, ajuste o CPF de teste em:
    spec/support/test_constants.rb
    CPF_TEST = "CPF_REAL_VALIDO_AQUI"

10. Executar testes:
    bundle exec rspec

11. Documentação da API
    https://www.postman.com/science-architect-36844716/workspace/my-workspace/collection/2781771
    2-a27a9c2e-31ba-4739-931a-0d40100f3b39?action=share&creator=27817712

12. Autor
    Douglas Gemir

    ***

13. Regras de negócios implementadas
    Usuário pode criar apenas autores do tipo pessoa ou instituição, vinculando os materiais a esses autores.

    Materiais (livros, artigos, vídeos) são sempre associados a um autor.

    Um usuário autenticado só pode gerenciar (criar, editar, apagar) materiais que ele próprio cadastrou (associação pelo CPF do usuário no material).

    Busca de materiais é feita com paginação e filtro por título, nome do autor ou descrição (busca full text parcial).

    Apenas usuários autenticados podem realizar operações de criação, edição e exclusão.

    Os dados de autenticação são armazenados com senha criptografada (bcrypt).

    Controle de acesso às operações via JWT e políticas Pundit para autorizar ações de usuários.

    Usuários podem editar e apagar somente seus próprios dados e materiais vinculados.

    O sistema suporta múltiplos tipos de autor (person ou institution) para flexibilidade na catalogação.

14. observações
    Não utiliza Docker
    Não há deploy público configurado
    Necessário ter PostgreSQL rodando localmente
    Código baseado na versão estável mais recente do Rails (8.0.2)
    Ruby 3.4.3

    Exemplos de uso podem serão encontrados na documentação interativa do postman

    Qualquer dúvida, estou à disposição!
