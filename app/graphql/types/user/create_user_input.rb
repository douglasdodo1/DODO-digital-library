module Types
  module User
    class CreateUserInput < Types::BaseInputObject
      description "Dados necessários para criar um usuário"

      argument :cpf, String, required: true
      argument :name, String, required: true
      argument :mail, String, required: true
      argument :password, String, required: true
    end
  end
end
