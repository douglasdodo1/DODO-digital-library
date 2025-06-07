module Types
  module Institution
    class InstitutionType < Types::BaseObject
      field :id, ID, null: false
      field :author_id, ID, null: false
      field :city, String, null: false

      field :author, Types::Author::AuthorType, null: false
      def author
        object.author
      end
    end
  end
end
