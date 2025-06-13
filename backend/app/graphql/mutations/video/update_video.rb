module Mutations
  module Video
    class UpdateVideo < Mutations::BaseMutation
      description "Atualiza os dados de um vídeo existente."

      argument :input, Types::Video::UpdateVideoInput, required: true

      type Types::Video::VideoPayload

      def resolve(input:)
        video = ::Video.find_by!(id: input[:id])
        material = ::Material.find_by!(id: video.material_id)
        author = nil

        if input[:authorName] && input[:authorType]
          case input[:authorType]
          when "person"
            raise GraphQL::ExecutionError, "Data de nascimento obrigatória" unless input[:personDateOfBirth]

            author = ::Author.find_or_create_by!(name: input[:authorName])
            ::Person.find_or_create_by!(author_id: author.id) do |p|
              p.birth_date = input[:personDateOfBirth]
            end

          when "institution"
            raise GraphQL::ExecutionError, "Cidade obrigatória" unless input[:institutionCity]

            author = ::Author.find_or_create_by!(name: input[:authorName])
            ::Institution.find_or_create_by!(author_id: author.id) do |i|
              i.city = input[:institutionCity]
            end

          else
            raise GraphQL::ExecutionError, "Tipo de autor inválido"
          end
        end

        material.update!(
          title: input[:title] || material.title,
          category: input[:category] || material.category,
          author_id: author&.id || material.author_id,
          description: input[:description] || material.description,
          status: input[:status] || material.status,
          publication_date: input[:publicationDate] || material.publication_date
        )

        video.update!(duration_minutes: input[:durationMinutes]) unless input[:durationMinutes].nil?

        { video: video, errors: [] }
      end
    end
  end
end
