module Mutations
  module Institution
    class DeleteInstitution < Mutations::BaseMutation
      description "Remove uma instituição pelo seu ID."

      argument :id, ID, required: true, description: "ID único da instituição a ser deletada."

      field :success, Boolean, null: false, description: "Indica se a exclusão foi bem-sucedida."
      field :errors, [ String ], null: false, description: "Lista de erros encontrados durante a operação, se houver."


      def resolve(id:)
        institution = ::Institution.find_by!(id: id)
        author = ::Author.find_by!(id: institution.author_id)

        institution.destroy!
        author.destroy!
        { success: true, errors: [] }
      end
    end
  end
end
