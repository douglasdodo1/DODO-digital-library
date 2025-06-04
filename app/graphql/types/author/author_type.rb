module Types
  module Author
    class AuthorType < Types::BaseObject
      field :id, ID, null: false
      field :name, String, null: false
    end
  end
end
