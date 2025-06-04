module Mutations
  module Book
    class DeleteBook < Mutations::BaseMutation
      description "Remove um livro e o material associado do sistema, identificado pelo ISBN fornecido."

      argument :input, Types::Book::DeleteBookInput, required: true
      field :success, Boolean, null: false
      field :errors, [String], null: false

      def resolve(input:)
        book = ::Book.find_by!(isbn: input[:isbn])
        material = ::Material.find_by!(id: book.material_id)

        userCpf = context[:current_user].cpf
        raise GraphQL::ExecutionError, "Nao autorizado" unless userCpf == material.user_cpf

        book.destroy!
        material.destroy!

        { success: true, errors: [] }
      rescue ActiveRecord::RecordNotFound => e
        { success: false, errors: [e.message] }
      rescue => e
        { success: false, errors: ["Erro ao deletar livro: #{e.message}"] }
      end
    end
  end
end
