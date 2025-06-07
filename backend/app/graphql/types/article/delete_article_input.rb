module Types
  module Article
    class DeleteArticleInput < Types::BaseInputObject
      description "Input para remover um artigo pelo DOI."
      argument :doi, String, required: true, description: "Identificador digital do artigo (DOI)."
    end
  end
end
