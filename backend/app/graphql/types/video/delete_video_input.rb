module Types
  module Video
    class DeleteVideoInput < Types::BaseInputObject
      description "Parâmetros para deletar um vídeo"
      
      argument :id, ID, required: true, description: "ID do vídeo que será deletado."
    end
  end
end
