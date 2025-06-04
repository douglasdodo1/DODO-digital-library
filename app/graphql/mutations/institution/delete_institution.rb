module Mutations
  module Institution
    class DeleteInstitution < Mutations::BaseMutation
      description "Remove uma instituição pelo seu ID."

      argument :input, Types::Institution::DeleteInstitutionInput, required: true

      field :success, Boolean, null: false, description: "Indica se a exclusão foi bem-sucedida."
      field :errors, [ String ], null: false, description: "Lista de erros encontrados durante a operação, se houver."

      def resolve(input:)
        institution = ::Institution.find_by!(id: input.id)

        institution.destroy!

        { success: true, errors: [] }
      end
    end
  end
end
