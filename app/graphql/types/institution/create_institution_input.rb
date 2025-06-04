module Types
  module Institution
    class CreateInstitutionInput < Types::BaseInputObject
      description "Atributos para criar uma instituição"

      argument :name, String, required: true, description: "Nome da instituição"
      argument :city, String, required: true, description: "Cidade da instituição"
    end
  end
end
