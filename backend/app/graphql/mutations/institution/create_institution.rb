module Mutations
  module Institution
    class CreateInstitution < Mutations::BaseMutation
      description "Cria uma nova instituição com nome e cidade informados."

      argument :input, Types::Institution::CreateInstitutionInput, required: true

      type Types::Institution::InstitutionPayload

      def resolve(input:)
        author = ::Author.create!(name: input.name)
        institution = ::Institution.create!(city: input.city, author_id: author.id)
        { institution: institution, errors: [] }
      end
    end
  end
end
