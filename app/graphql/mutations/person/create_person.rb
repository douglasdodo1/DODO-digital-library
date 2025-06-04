module Mutations
  module Person
    class CreatePerson < Mutations::BaseMutation
      description "Cria uma nova pessoa com nome e data de nascimento."

      argument :name, String, required: true, description: "Nome completo da pessoa."
      argument :birthDate, GraphQL::Types::ISO8601Date, required: true, description: "Data de nascimento da pessoa no formato 'YYYY-MM-DD'."

      type Types::Person::PersonPayload

      def resolve(name:, birth_date:)
        author = Author.create!(
          name: name
        )

        person = ::Person.create!(
          birth_date: birthDate,
          author_id: author.id
        )
        { person: person, errors: [] }
      end
    end
  end
end
