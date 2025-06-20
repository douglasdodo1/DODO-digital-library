module Types
  class QueryType < Types::BaseObject
    # Usuário
    field :user_by_cpf, Types::User::UserType, null: true do
      description "Retorna um usuário dado o CPF"
      argument :cpf, String, required: true
    end

    field :user_authenticated, Types::User::UserType, null: true do
      description "Retorna o usuário autenticado"
    end

    field :author_by_id, Types::Author::AuthorType, null: true do
      description "Retorna um autor dado o ID"
      argument :id, ID, required: true
    end

    field :all_authors, [Types::Author::AuthorType], null: true do
      description "Retorna todos os autores"
    end

    field :person_by_id, Types::Person::PersonType, null: true do
      description "Retorna uma pessoa dado o ID"
      argument :id, ID, required: true
    end

    field :institution_by_id, Types::Institution::InstitutionType, null: true do
      description "Retorna uma instituição dado o ID"
      argument :id, ID, required: true
    end

    # Livros
    field :book_by_isbn, Types::Book::BookType, null: true do
      description "Retorna um livro dado o ISBN"
      argument :isbn, String, required: true
    end
    field :all_books, [Types::Book::BookType], null: true do
      description "Retorna todos os livros"
    end

    # Vídeos
    field :video_by_id, Types::Video::VideoType, null: true do
      description "Retorna um vídeo dado o ID"
      argument :id, ID, required: true
    end
    field :all_videos, [Types::Video::VideoType], null: true do
      description "Retorna todos os vídeos"
    end

    # Artigos
    field :article_by_doi, Types::Article::ArticleType, null: true do
      description "Retorna um artigo dado o DOI"
      argument :doi, String, required: true
    end
    field :all_articles, [Types::Article::ArticleType], null: true do
      description "Retorna todos os artigos"
    end

    # Busca genérica com paginação (Relay style)
    field :search_materials, Types::Material::MaterialType.connection_type, null: false do
      description "Busca materiais por título, autor ou descrição, com paginação"
      argument :query, String, required: true
      argument :page, Integer, required: false, default_value: 1
      argument :per_page, Integer, required: false, default_value: 10
    end

    # --- Resolver methods ---

    def user_by_cpf(cpf:)
      ::User.find_by(cpf: cpf)
    end

    def user_authenticated
      userCpf = context[:current_user].cpf

      ::User.find_by(cpf: userCpf)
    end

    def author_by_id(id:)
      ::Author.includes(:person, :institution).find_by(id: id)
    end

    def all_authors
      ::Author.includes(:person, :institution).all
    end

    def person_by_id(id:)
      ::Person.includes(:author).find_by(id: id)
    end

    def institution_by_id(id:)
      ::Institution.includes(:author).find_by(id: id)
    end

    def book_by_isbn(isbn:)
      ::Book.find_by(isbn: isbn)
    end

    def all_books
      ::Book.includes(material: :author).all
    end

    def video_by_id(id:)
      ::Video.includes(material: :author).find_by(id: id)
    end

    def all_videos
      ::Video.includes(material: :author).all
    end

    def article_by_doi(doi:)
      ::Article.find_by(doi: doi)
    end

    def all_articles
      ::Article.includes(material: :author).all
    end

    def search_materials(query:, page:, per_page:)
      ::Material
        .joins(:author)
        .where("materials.title ILIKE :q OR authors.name ILIKE :q OR materials.description ILIKE :q", q: "%#{query}%")
        .distinct
        .page(page)
        .per(per_page)
    end
  end
end
