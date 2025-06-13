module Types
  module Book
    class CreateBookInput < Types::BaseInputObject
      description "Campos necessários para criar um novo livro."

      argument :isbn, String, required: true, description: "ISBN do livro, identificador único internacional."
      argument :title, String, required: true, description: "Título do livro."
      argument :category, String, required: false, description: "Categoria do livro."
      argument :description, String, required: false, description: "Descrição opcional do livro."
      argument :status, String, required: true, description: "Status do material ('rascunho', 'publicado' e 'enviado')."
      argument :authorName, String, required: true, description: "Nome do autor do livro."
      argument :authorType, String, required: true, description: "Tipo do autor: 'person' para pessoa física ou 'institution' para instituição."
      argument :personDateOfBirth, GraphQL::Types::ISO8601Date, required: false, description: "Data de nascimento do autor, obrigatória se authorType for 'person'."
      argument :institutionCity, String, required: false, description: "Cidade da instituição, obrigatória se authorType for 'institution'."
      argument :pageNumbers, Integer, required: true, description: "Número total de páginas do livro."
      argument :publicationDate , GraphQL::Types::ISO8601Date, required: false, description: "Data de publicação do livro."

    end
  end
end
