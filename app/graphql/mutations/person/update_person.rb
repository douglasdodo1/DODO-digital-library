module Mutations
  module Person
    class UpdatePerson < Mutations::BaseMutation
      description "Atualiza os dados de uma pessoa existente pelo ID."

      argument :id, ID, required: true, description: "ID único da pessoa a ser atualizada."
      argument :name, String, required: false, description: "Novo nome da pessoa."
      argument :birthDate, GraphQL::Types::ISO8601Date, required: false, description: "Nova data de nascimento da pessoa no formato 'YYYY-MM-DD'."

      type Types::Person::PersonPayload

      def resolve(id:, name: nil, birthDate: nil)
        person = ::Person.find_by!(id: id)
        author = ::Author.find_by!(id: person.author_id)

        author.update!(name: author.name || name)
        person.update!(birth_date: person.birth_date || birthDate)
        { person: person, errors: [] }
      end
    end
  end
end
