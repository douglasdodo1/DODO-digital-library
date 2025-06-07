module Types
  module Video
    class VideoType < Types::BaseObject
      field :id, ID, null: false
      field :duration_minutes, Integer, null: false
      field :material_id, Integer, null: false
      field :material, Types::Material::MaterialType, null: false

      def material
        object.material
      end
    end
  end
end
