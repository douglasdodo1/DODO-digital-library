module Types
  module Institution
    class DeleteInstitutionInput < Types::BaseInputObject
      description "Atributos para deletar uma instituição"

      argument :id, ID, required: true, description: "ID da instituição a ser deletada"
    end
  end
end
