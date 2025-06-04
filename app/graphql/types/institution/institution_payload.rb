module Types
  module Institution
    class InstitutionPayload < Types::BaseObject
      field :institution, Types::Institution::InstitutionType, null: false
      field :errors, [ String ], null: false
    end
  end
end
