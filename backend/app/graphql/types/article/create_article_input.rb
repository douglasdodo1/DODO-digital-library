module Types
  module Article
    class CreateArticleInput < Types::BaseInputObject
      description "Campos necessários para criar um novo artigo e seu material associado."

      argument :doi, String, required: true, description: "Identificador digital do artigo (DOI - Digital Object Identifier). Deve ser único."
      argument :title, String, required: true, description: "Título do material relacionado ao artigo."
      argument :description, String, required: false, description: "Descrição opcional do material."
      argument :status, String, required: true, description: "Status do material ('rascunho', 'publicado' e 'enviado')."
      argument :language, String, required: true, description: "Idioma do artigo (ex: 'pt', 'en', 'es')."
      argument :author_name, String, required: true, description: "Nome do autor do material."
      argument :author_type, String, required: true, description: "Tipo do autor: 'person' para pessoa física ou 'institution' para instituição."
      argument :person_date_of_birth, GraphQL::Types::ISO8601Date, required: false, description: "Data de nascimento do autor, obrigatória se author_type for 'person'."
      argument :institution_city, String, required: false, description: "Cidade da instituição, obrigatória se author_type for 'institution'."
      argument :publicationDate , GraphQL::Types::ISO8601Date, required: false, description: "Data de publicação do artigo."

    end
  end
end
