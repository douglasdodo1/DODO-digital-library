module Mutations
  module Person
    class CreatePerson < Mutations::BaseMutation
      description "Cria uma nova pessoa com nome e data de nascimento."

      argument :input, Types::Person::CreatePersonInput, required: true

      type Types::Person::PersonPayload

      def resolve(input:)
        author = Author.create!(name: input.name)

        person = ::Person.create!(
          birth_date: input.birth_date,
          author_id: author.id
        )

        { person: person, errors: [] }
      end
    end
  end
end
