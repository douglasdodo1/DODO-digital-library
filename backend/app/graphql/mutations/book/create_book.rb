module Mutations
  module Book
    class CreateBook < BaseMutation
      description "Cria um novo livro com seus dados principais, vinculando o livro a um autor (pessoa física ou instituição) e ao usuário responsável pelo cadastro."
      argument :input, Types::Book::CreateBookInput, required: true
      type Types::Book::BookPayload

      def resolve(input:)
        require_authentication!

        if input[:authorName].blank? || (input[:personDateOfBirth].blank? && input[:institutionCity].blank?)
          raise GraphQL::ExecutionError, "Nome do autor e pelo menos data de nascimento ou cidade devem ser fornecidos"
        end

        case input[:authorType]
        when "person"
          if input[:personDateOfBirth]
            author = ::Author.find_or_create_by!(name: input[:authorName])
            ::Person.find_or_create_by!(author_id: author.id) do |person|
              person.birth_date = input[:personDateOfBirth]
            end
          else
            raise GraphQL::ExecutionError, "Data de nascimento é obrigatória para pessoa física"
          end

        when "institution"
          if input[:institutionCity]
            author = ::Author.find_or_create_by!(name: input[:authorName])
            ::Institution.find_or_create_by!(author_id: author.id) do |institution|
              institution.city = input[:institutionCity]
            end
          else
            raise GraphQL::ExecutionError, "Cidade é obrigatória para instituição"
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

        number_isbn = input[:isbn].gsub(/\D/, '')
        book = ::Book.create!(
          isbn: number_isbn,
          page_numbers: input[:pageNumbers],
          material_id: material.id
        )

        { book: book, errors: [] }
      end
    end
  end
end
