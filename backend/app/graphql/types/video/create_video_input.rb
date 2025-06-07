module Types
  module Video
    class CreateVideoInput < Types::BaseInputObject
      description "Parâmetros para criação de um novo vídeo associado a um material"

      argument :durationMinutes, Integer, required: true, description: "Duração do vídeo em minutos."
      argument :title, String, required: true, description: "Título do material relacionado ao vídeo."
      argument :description, String, required: false, description: "Descrição opcional do vídeo."
      argument :status, String, required: true, description: "Status do material ('rascunho', 'publicado' e 'enviado')."
      argument :authorName, String, required: true, description: "Nome do autor do material."
      argument :authorType, String, required: true, description: "Tipo do autor: 'person' para pessoa física ou 'institution' para instituição."
      argument :personDateOfBirth, GraphQL::Types::ISO8601Date, required: false, description: "Data de nascimento do autor (obrigatória se authorType for 'person')."
      argument :institutionCity, String, required: false, description: "Cidade da instituição (obrigatória se authorType for 'institution')."
      argument :userCpf, String, required: true, description: "CPF do usuário responsável pelo cadastro (formato: '00000000000')."
    end
  end
end
