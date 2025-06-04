module Types
  module Person
    class PersonPayload < BaseObject
      field :person, Types::Person::PersonType, null: false
      field :errors, [ String ], null: false
    end
  end
end
