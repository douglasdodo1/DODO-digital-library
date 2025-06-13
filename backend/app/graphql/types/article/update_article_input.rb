module Types
  module Article
    class UpdateArticleInput < Types::BaseInputObject
      description "Input para atualizar os dados de um artigo e seu material associado."

      argument :doi, String, required: true, description: "DOI do artigo a ser atualizado."
      argument :category, String, required: false, description: "Nova categoria do artigo."
      argument :language, String, required: false, description: "Novo idioma do artigo (ex: 'pt', 'en')."
      argument :title, String, required: false, description: "Novo título do material associado ao artigo."
      argument :description, String, required: false, description: "Nova descrição do material associado ao artigo."
      argument :status, String, required: false, description: "Novo status do material ('rascunho', 'publicado' e 'enviado')."
      argument :author_name, String, required: false, description: "Novo nome do autor."
      argument :author_type, String, required: false, description: "Tipo do autor ('person' ou 'institution')."
      argument :person_date_of_birth, GraphQL::Types::ISO8601Date, required: false, description: "Data de nascimento do autor, obrigatória se o tipo for 'person'."
      argument :institution_city, String, required: false, description: "Cidade da instituição, obrigatória se o tipo for 'institution'."
      argument :publicationDate, GraphQL::Types::ISO8601Date, required: false, description: "Data de publicação do artigo (formato: YYYY-MM-DD)."
    end
  end
end
