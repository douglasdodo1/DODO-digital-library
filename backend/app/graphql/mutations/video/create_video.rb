module Mutations
  module Video
    class CreateVideo < Mutations::BaseMutation
      description "Cria um novo vídeo associado a um material e autor, vinculando ao usuário responsável pelo cadastro."
      argument :input, Types::Video::CreateVideoInput, required: true
      type Types::Video::VideoPayload

      def resolve(input:)
        require_authentication!

        if input[:authorName].blank? || (input[:personDateOfBirth].blank? && input[:institutionCity].blank?)
          raise GraphQL::ExecutionError, "Nome do autor e pelo menos uma informação de pessoa ou instituição devem ser fornecidos"
        end

        case input[:authorType]
        when "person"
          raise GraphQL::ExecutionError, "Data de nascimento é obrigatória para pessoa física" unless input[:personDateOfBirth]

          author = ::Author.find_or_create_by!(name: input[:authorName])
          ::Person.find_or_create_by!(author_id: author.id) do |person|
            person.birth_date = input[:personDateOfBirth]
          end

        when "institution"
          raise GraphQL::ExecutionError, "Cidade é obrigatória para instituição" unless input[:institutionCity]

          author = ::Author.find_or_create_by!(name: input[:authorName])
          ::Institution.find_or_create_by!(author_id: author.id) do |institution|
            institution.city = input[:institutionCity]
          end

        else
          raise GraphQL::ExecutionError, "Tipo de autor inválido: #{input[:authorType]}"
        end

        userCpf = context[:current_user].cpf

        material = ::Material.create!(
          title: input[:title],
          description: input[:description],
          status: input[:status],
          author_id: author.id,
          user_cpf: userCpf
        )

        video = ::Video.create!(
          duration_minutes: input[:durationMinutes],
          material_id: material.id
        )

        { video: video, errors: [] }
      end
    end
  end
end
