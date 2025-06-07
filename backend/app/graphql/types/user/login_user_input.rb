module Types
  module User
    class LoginUserInput < Types::BaseInputObject
      description "Dados necessários para autenticar um usuário."

      argument :mail, String, required: true, description: "Endereço de e-mail do usuário."
      argument :password, String, required: true, description: "Senha do usuário."
    end
  end
end
