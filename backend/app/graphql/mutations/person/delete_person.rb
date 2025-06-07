module Mutations
  module Person
    class DeletePerson < Mutations::BaseMutation
      description "Remove uma pessoa pelo ID."

      argument :input, Types::Person::DeletePersonInput, required: true

      field :success, Boolean, null: false, description: "Indica se a exclusão foi bem-sucedida."
      field :errors, [String], null: false, description: "Lista de erros, caso a exclusão falhe."

      def resolve(input:)
        person = ::Person.find_by!(id: input.id)
        author = ::Author.find_by!(id: person.author_id)

        person.destroy!
        author.destroy!

        { success: true, errors: [] }
      end
    end
  end
end
