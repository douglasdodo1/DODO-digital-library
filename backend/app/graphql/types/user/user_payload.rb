module Types
  module User
    class UserPayload < Types::BaseObject
      field :user, Types::User::UserType, null: true
      field :errors, [ String ], null: false
    end
  end
end
