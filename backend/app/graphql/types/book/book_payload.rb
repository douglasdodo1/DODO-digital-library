module Types
  module Book
    class BookPayload < Types::BaseObject
      field :book, Types::Book::BookType, null: false
      field :errors, [ String ], null: false
    end
  end
end
