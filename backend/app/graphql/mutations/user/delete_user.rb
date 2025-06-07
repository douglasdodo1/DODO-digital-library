module Mutations
  module User
    class DeleteUser < Mutations::BaseMutation
      description "Remove um usuário do sistema pelo CPF fornecido."

      argument :input, Types::User::DeleteUserInput, required: true

      field :success, Boolean, null: false, description: "Indica se a remoção foi bem-sucedida."
      field :errors, [ String ], null: false, description: "Lista de mensagens de erro caso a remoção falhe."

      def resolve(input:)
        require_authentication!
        user = context[:current_user]

        user.destroy!
        { success: true, errors: [] }
      end
    end
  end
end
