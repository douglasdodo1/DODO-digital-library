module Mutations
  module Person
    class UpdatePerson < Mutations::BaseMutation
      description "Atualiza os dados de uma pessoa existente pelo ID."

      argument :input, Types::Person::UpdatePersonInput, required: true

      type Types::Person::PersonPayload

      def resolve(input:)
        person = ::Person.find_by!(id: input.id)
        author = ::Author.find_by!(id: person.author_id)

        author.update!(name: input.name) if input.name.present?
        person.update!(birth_date: input.birth_date) if input.birth_date.present?

        { person: person, errors: [] }
      end
    end
  end
end
