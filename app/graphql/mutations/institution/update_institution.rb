module Mutations
  module Institution
    class UpdateInstitution < Mutations::BaseMutation
      description "Atualiza os dados de uma instituição existente."

      argument :id, ID, required: true, description: "ID único da instituição a ser atualizada."
      argument :name, String, required: false, description: "Novo nome da instituição."
      argument :city, String, required: false, description: "Nova cidade da instituição."

      type Types::Institution::InstitutionPayload

      def resolve(id:, name: nil, city: nil)
        institution = ::Institution.find_by!(id: id)
        author = ::Author.find_by!(id: institution.author_id)

        author.update!(name: author.name || name)
        institution.update!(city: institution.city || city)
        { institution: institution, errors: [] }
      end
    end
  end
end
