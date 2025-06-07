module Types
  module User
    class UserType < Types::BaseObject
      field :cpf, String, null: false
      field :name, String, null: false
      field :mail, String, null: false
    end
  end
end
