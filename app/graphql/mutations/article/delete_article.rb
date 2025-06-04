module Mutations
  module Article
    class DeleteArticle < Mutations::BaseMutation
      description "Remove um artigo pelo DOI e também deleta o material associado."
      argument :input, Types::Article::DeleteArticleInput, required: true
      field :success, Boolean, null: false
      field :errors, [String], null: false

      def resolve(input:)
        require_authentication!
        doi = input[:doi]

        article  = ::Article.find_by!(doi: doi)
        material = ::Material.find_by!(id: article.material_id)

        user_cpf = context[:current_user].cpf
        raise GraphQL::ExecutionError, "Não autorizado" unless user_cpf == material.user_cpf

        ActiveRecord::Base.transaction do
          article.destroy!
          material.destroy!
        end

        { success: true, errors: [] }
      rescue ActiveRecord::RecordNotFound => e
        raise GraphQL::ExecutionError, e.message
      end
    end
  end
end
