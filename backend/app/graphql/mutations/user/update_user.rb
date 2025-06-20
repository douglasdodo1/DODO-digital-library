module Mutations
  module User
    class UpdateUser < BaseMutation
      description "Atualiza os dados de um usuário existente, identificado pelo CPF."

      argument :input, Types::User::UpdateUserInput, required: true

      type Types::User::UserPayload

      def resolve(input:)
        require_authentication!
        user = context[:current_user]

        user.update!(
          name: input[:name] || user.name,
          mail: input[:mail] || user.mail,
        )

        { user: user, errors: [] }
      end
    end
  end
end
