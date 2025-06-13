module Types
  module Article
    class ArticleType < Types::BaseObject
      field :doi, String, null: false
      field :language, String, null: false
      field :materialId, String, null: false
      field :material, Types::Material::MaterialType, null: false

      def material
        object.material
      end

      def publicationDate
        object.publication_date
      end
    end
  end
end
