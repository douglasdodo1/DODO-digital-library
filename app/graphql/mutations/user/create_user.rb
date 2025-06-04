module Mutations
  module User
    class CreateUser < BaseMutation
      description "Cria um novo usuário com CPF, nome, e-mail e senha."
      argument :input, Types::User::CreateUserInput, required: true
      type Types::User::UserPayload

      def resolve(input:)
        number_cpf = input[:cpf].gsub(/\D/, '')
        
        user = ::User.create!(
          cpf: number_cpf,
          name: input[:name],
          mail: input[:mail],
          password: input[:password]
        )

        { user: user, errors: [] }
      end
    end
  end
end
