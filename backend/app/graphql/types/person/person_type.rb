module Types
    module Person
      class PersonType < Types::BaseObject
        field :id, ID, null: false
        field :author_id, ID, null: false
        field :birthDate, GraphQL::Types::ISO8601Date, null: false
        field :author, Types::Author::AuthorType, null: false

        def author
          object.author
        end

        def birthDate
          object.birth_date
        end
      end
    end
end
