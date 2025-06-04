module Mutations
  module User
    class LoginUser < BaseMutation
      description "Autentica um usuário com e-mail e senha, retornando um token JWT."

      argument :input, Types::User::LoginUserInput, required: true

      field :token, String, null: true
      field :errors, [ String ], null: false

      def resolve(input:)
        user = ::User.find_by(mail: input[:mail])

        if user&.authenticate(input[:password])
          token = context[:encode_token].call({ cpf: user.cpf })
          { token: token, errors: [] }
        else
          { token: nil, errors: [ "Email ou senha inválidos" ] }
        end
      end
    end
  end
end
