module Types
  module Person
    class UpdatePersonInput < Types::BaseInputObject
      description "Parâmetros para atualizar uma pessoa."

      argument :id, ID, required: true, description: "ID da pessoa a ser atualizada."
      argument :name, String, required: false, description: "Novo nome da pessoa."
      argument :birth_date, GraphQL::Types::ISO8601Date, required: false, description: "Nova data de nascimento da pessoa no formato 'YYYY-MM-DD'."
    end
  end
end
