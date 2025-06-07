module Types
  module User
    class DeleteUserInput < Types::BaseInputObject
      description "Dados necessários para remover um usuário."

      argument :cpf, String, required: true, description: "CPF do usuário que será removido (formato: '00000000000')."
    end
  end
end
