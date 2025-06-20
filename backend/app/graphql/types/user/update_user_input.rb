module Types
  module User
    class UpdateUserInput < Types::BaseInputObject
      description "Campos opcionais para atualizar os dados de um usuário."

      argument :name, String, required: false, description: "Novo nome do usuário."
      argument :mail, String, required: false, description: "Novo e-mail do usuário."
    end
  end
end
