module Mutations
  module Article
    class UpdateArticle < BaseMutation
      description "Atualiza os dados de um artigo e o material relacionado com base no DOI."
      argument :input, Types::Article::UpdateArticleInput, required: true
      type Types::Article::ArticlePayload

      def resolve(input:)
        require_authentication!

        article = ::Article.find_by!(doi: input[:doi])
        material = ::Material.find_by!(id: article.material_id)
        user_cpf = context[:current_user].cpf
        raise GraphQL::ExecutionError, "Não autorizado" unless user_cpf == material.user_cpf

        author = nil
        if input[:author_name] && input[:author_type]
          case input[:author_type]
          when "person"
            raise GraphQL::ExecutionError, "Data de nascimento obrigatória" unless input[:person_date_of_birth]
            author = ::Author.find_or_create_by!(name: input[:author_name])
            ::Person.find_or_create_by!(author_id: author.id) do |p|
              p.birth_date = input[:person_date_of_birth]
            end
          when "institution"
            raise GraphQL::ExecutionError, "Cidade obrigatória" unless input[:institution_city]
            author = ::Author.find_or_create_by!(name: input[:author_name])
            ::Institution.find_or_create_by!(author_id: author.id) do |i|
              i.city = input[:institution_city]
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

        article.update!(
          language: input[:language] || article.language
        )

        { article: article, errors: [] }
      end
    end
  end
end
