module Mutations
  module Book
    class UpdateBook < Mutations::BaseMutation
      description "Atualiza os dados de um livro existente."
      argument :input, Types::Book::UpdateBookInput, required: true
      type Types::Book::BookPayload

      def resolve(input:)
        require_authentication!
        number_isbn = input[:isbn].gsub(/\D/, '')
        book = ::Book.find_by!(isbn: number_isbn)
        material = ::Material.find_by!(id: book.material_id)
        author = nil

        userCpf = context[:current_user].cpf
        raise GraphQL::ExecutionError, "Nao autorizado" unless userCpf == material.user_cpf

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

        book.update!(
          page_numbers: input[:page_numbers] || book.page_numbers
        )

        { book: book, errors: [] }
      end
    end
  end
end
