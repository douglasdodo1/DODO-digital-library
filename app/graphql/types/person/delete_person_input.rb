module Types
  module Person
    class DeletePersonInput < Types::BaseInputObject
      description "Parâmetros para remover uma pessoa."

      argument :id, ID, required: true, description: "ID único da pessoa a ser deletada."
    end
  end
end
