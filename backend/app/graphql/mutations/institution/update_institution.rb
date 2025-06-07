module Mutations
  module Institution
    class UpdateInstitution < Mutations::BaseMutation
      description "Atualiza os dados de uma instituição existente."

      argument :input, Types::Institution::UpdateInstitutionInput, required: true

      type Types::Institution::InstitutionPayload

      def resolve(input:)
        institution = ::Institution.find_by!(id: input.id)
        author = ::Author.find_by!(id: institution.author_id)

        author.update!(name: input.name) if input.name.present?
        institution.update!(city: input.city) if input.city.present?

        { institution: institution, errors: [] }
      end
    end
  end
end
