module Types
  module Author
    class AuthorType < Types::BaseObject
      field :id, ID, null: false
      field :name, String, null: false

      
      field :person, Types::Person::PersonType, null: true
      field :institution, Types::Institution::InstitutionType, null: true
    end
  end
end
