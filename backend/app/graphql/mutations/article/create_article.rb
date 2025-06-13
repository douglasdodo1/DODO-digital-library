module Mutations
  module Article
    class CreateArticle < BaseMutation
      description "Cria um novo artigo e o material associado, vinculando a um autor (pessoa ou instituição) e a um usuário por CPF."
      argument :input, Types::Article::CreateArticleInput, required: true
      type Types::Article::ArticlePayload

      def resolve(input:)
        require_authentication!

        case input.author_type
        when "person"
          if input.person_date_of_birth
            author = ::Author.find_or_create_by!(name: input.author_name)
            ::Person.find_or_create_by!(author_id: author.id) do |person|
              person.birth_date = input.person_date_of_birth
            end
          else
            raise GraphQL::ExecutionError, "Data de nascimento é obrigatória para pessoa física"
          end

        when "institution"
          if input.institution_city
            author = ::Author.find_or_create_by!(name: input.author_name)
            ::Institution.find_or_create_by!(author_id: author.id) do |institution|
              institution.city = input.institution_city
            end
          else
            raise GraphQL::ExecutionError, "Cidade é obrigatória para instituição"
          end
        else
          raise GraphQL::ExecutionError, "Tipo de autor inválido: #{input.author_type}"
        end

        userCpf = context[:current_user].cpf

        material = ::Material.create!(
          title: input.title,
          description: input.description,
          status: input.status,
          user_cpf: userCpf,
          author_id: author.id,
          publication_date: input[:publicationDate]

        )

        article = ::Article.create!(
          doi: input.doi,
          material_id: material.id,
          publication_date: input.publication_date,
          language: input.language
        )

        { article: article, errors: [] }
      end
    end
  end
end
