module Types
  module Book
    class BookType < Types::BaseObject
      field :isbn, String, null: false
      field :pageNumbers, Integer, null: false
      field :materialId, ID, null: false
      field :material, Types::Material::MaterialType, null: false

      def material
        object.material
      end

      def pageNumbers
        object.page_numbers
      end
    end
  end
end
