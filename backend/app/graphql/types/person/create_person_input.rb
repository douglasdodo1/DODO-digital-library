module Types
  module Person
    class CreatePersonInput < Types::BaseInputObject
      description "Parâmetros para criação de uma nova pessoa."

      argument :name, String, required: true, description: "Nome completo da pessoa."
      argument :birth_date, GraphQL::Types::ISO8601Date, required: true, description: "Data de nascimento no formato YYYY-MM-DD."
    end
  end
end
