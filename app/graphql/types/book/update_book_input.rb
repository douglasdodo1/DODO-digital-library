module Types
  module Book
    class UpdateBookInput < Types::BaseInputObject
      description "Campos para atualizar um livro existente."

      argument :isbn, String, required: true, description: "ISBN do livro a ser atualizado."
      argument :title, String, required: false, description: "Novo título do livro."
      argument :page_numbers, Integer, required: false, description: "Novo número de páginas do livro."
      argument :authorName, String, required: false, description: "Nome do autor atualizado."
      argument :authorType, String, required: false, description: "Tipo do autor: 'person' ou 'institution'."
      argument :personDateOfBirth, GraphQL::Types::ISO8601Date, required: false, description: "Data de nascimento (obrigatória se for pessoa)."
      argument :institutionCity, String, required: false, description: "Cidade (obrigatória se for instituição)."
      argument :description, String, required: false, description: "Nova descrição do livro."
      argument :status, String, required: false, description: "Novo status ('rascunho', 'publicado', 'enviado')."
    end
  end
end
