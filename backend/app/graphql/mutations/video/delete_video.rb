module Mutations
  module Video
    class DeleteVideo < BaseMutation
      description "Remove um vídeo pelo seu ID."

      argument :input, Types::Video::DeleteVideoInput, required: true

      field :success, Boolean, null: false, description: "Indica se a deleção foi realizada com sucesso."
      field :errors, [String], null: false, description: "Lista de mensagens de erro, caso ocorram problemas na deleção."

      def resolve(input:)
        video = ::Video.find_by!(id: input[:id])
        material = ::Material.find_by!(id: video.material_id)

        video.destroy!
        material.destroy!

        { success: true, errors: [] }
      rescue ActiveRecord::RecordNotFound => e
        { success: false, errors: [e.message] }
      rescue => e
        { success: false, errors: ["Erro ao deletar vídeo: #{e.message}"] }
      end
    end
  end
end
