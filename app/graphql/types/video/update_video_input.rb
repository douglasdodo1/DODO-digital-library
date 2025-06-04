module Types
  module Video
    class UpdateVideoInput < Types::BaseInputObject
      description "Parâmetros para atualizar um vídeo"

      argument :id, ID, required: true, description: "ID do vídeo que será atualizado."
      argument :durationMinutes, Integer, required: false, description: "Duração do vídeo em minutos."
      argument :title, String, required: false, description: "Título do vídeo."
      argument :description, String, required: false, description: "Descrição opcional do vídeo."
      argument :status, String, required: false, description: "Status do vídeo ('rascunho', 'publicado' ou 'enviado')."
      argument :authorName, String, required: false, description: "Nome do autor do vídeo."
      argument :authorType, String, required: false, description: "Tipo do autor: 'person' para pessoa física ou 'institution' para instituição."
      argument :personDateOfBirth, GraphQL::Types::ISO8601Date, required: false, description: "Data de nascimento do autor, obrigatória se authorType for 'person'."
      argument :institutionCity, String, required: false, description: "Cidade da instituição, obrigatória se authorType for 'institution'."
    end
  end
end
