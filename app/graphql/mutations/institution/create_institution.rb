module Mutations
  module Institution
    class CreateInstitution < Mutations::BaseMutation
      description "Cria uma nova instituição com nome e cidade informados."

      argument :name, String, required: true, description: "Nome da instituição a ser criada."
      argument :city, String, required: true, description: "Cidade onde a instituição está localizada."


      type Types::Institution::InstitutionPayload

      def resolve(name:, city:)
        author = ::Author.create!(name: name)
        institution = ::Institution.create!(city: city, author_id: author.id)
        { institution: institution, errors: [] }
      end
    end
  end
end
