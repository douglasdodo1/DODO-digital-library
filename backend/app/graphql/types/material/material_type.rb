module Types
  module Material
    class MaterialType < Types::BaseObject
      field :id, ID, null: false
      field :title, String, null: false
      field :category, String, null: false
      field :description, String, null: true
      field :status, String, null: false
      field :authorId, ID, null: false, method: :author_id
      field :userCpf, String, null: false, method: :user_cpf
      field :author, Types::Author::AuthorType, null: false
      field :user, Types::User::UserType, null: false
      field :publicationDate, GraphQL::Types::ISO8601Date, null: false


      def author
        object.author
      end

      def user
        object.user
      end

      def publicationDate
        object.publication_date
      end
    end
  end
end
