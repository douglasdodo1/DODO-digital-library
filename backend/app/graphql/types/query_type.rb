# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :user_by_cpf, Types::User::UserType, null: true do
      description "Retorna um usuário dado o CPF"
      argument :cpf, String, required: true
    end

    field :person_by_id, Types::Person::PersonType, null: true do
      description "Retorna uma pessoa dado o ID"
      argument :id, ID, required: true
    end

    field :institution_by_id, Types::Institution::InstitutionType, null: true do
      description "Retorna uma instituição dado o ID"
      argument :id, ID, required: true
    end

    field :book_by_isbn, Types::Book::BookType, null: true do
      description "Retorna um livro dado o ISBN"
      argument :isbn, String, required: true
    end
    field :all_books, [Types::Book::BookType], null: true do
      description "Retorna todos os livros"
    end

    field :video_by_id, Types::Video::VideoType, null: true do
      description "Retorna um video dado o ID"
      argument :id, ID, required: true
    end

    field :all_videos, [Types::Video::VideoType], null: true do
      description "Retorna todos os videos"
    end

    field :article_by_doi, Types::Article::ArticleType, null: true do
      description "Retorna um artigo dado o DOI"
      argument :doi, String, required: true
    end

    field :all_articles, [Types::Article::ArticleType], null: true do
      description "Retorna todos os artigos"
    end

    field :search_materials, Types::Material::MaterialType.connection_type, null: false do
      description "Busca materiais por título, autor ou descrição, com paginação"
      argument :query, String, required: true
      argument :page, Integer, required: false, default_value: 1
      argument :per_page, Integer, required: false, default_value: 10
    end

    def search_materials(query:, page:, per_page:)
      materials = ::Material.joins(:author)
        .where("materials.title ILIKE :q OR authors.name ILIKE :q OR materials.description ILIKE :q", q: "%#{query}%")
        .distinct
        .page(page)
        .per(per_page)
      materials
    end

    def user_by_cpf(cpf:)
      ::User.find_by(cpf: cpf)
    end

    def person_by_id(id:)
      ::Person.includes(:author).find_by(id: id)
    end

    def institution_by_id(id:)
      ::Institution.includes(:author).find_by(id: id)
    end

    def video_by_id(id:)
      ::Video.includes(material: :author).find_by(id: id)
    end

    def all_videos()
      ::Video.includes(material: :author)
    end

    def article_by_doi(doi:)
      ::Article.find_by(doi: doi)
    end

    def all_articles()
      ::Article.includes(material: :author)
    end

    def book_by_isbn(isbn:)
      ::Book.find_by(isbn: isbn)
    end

    def all_books()
      ::Book.includes(material: :author)
    end

  end
end
