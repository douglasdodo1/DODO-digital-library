module Types
  module Institution
    class UpdateInstitutionInput < Types::BaseInputObject
      description "Atributos para atualizar uma instituição"

      argument :id, ID, required: true, description: "ID da instituição a ser atualizada"
      argument :name, String, required: false, description: "Novo nome da instituição"
      argument :city, String, required: false, description: "Nova cidade da instituição"
    end
  end
end
