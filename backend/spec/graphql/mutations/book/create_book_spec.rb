require 'rails_helper'

RSpec.describe Mutations::Book::CreateBook, type: :request do
  let(:mutation) do
    <<~GQL
      mutation createBook($input: CreateBookInput!) {
        createBook(input: $input) {
          book {
            isbn
            pageNumbers
            material {
              title
              description
              status
              author {
                name
              }
              user {
                cpf
              }
            }
          }
          errors
        }
      }
    GQL
  end

  let!(:user) { User.create!(cpf: TestConstants::CPF_TEST, name: "Usuário Teste", mail: "teste@example.com", password: "password") }

  before do
    allow_any_instance_of(GraphqlController).to receive(:context).and_return({ current_user: user })
  end

  context 'when creating a book with author type person' do
    let(:valid_input_person) do
      {
        authorName: "Autor Pessoa",
        authorType: "person",
        personDateOfBirth: "1980-05-10",
        institutionCity: nil,
        title: "Livro de Teste",
        description: "Descrição do livro de teste",
        status: "publicado",
        isbn: "9788566229202",
        pageNumbers: 250
      }
    end

    it 'creates a book and associated person-author successfully' do
      result = graphql_query(mutation, variables: { input: valid_input_person })

      expect(result['errors']).to be_nil

      data = result.dig('data', 'createBook')
      expect(data['errors']).to be_empty

      book_data = data['book']
      expect(book_data['isbn']).to eq("9788566229202")
      expect(book_data['pageNumbers']).to eq(250)

      material = book_data['material']
      expect(material['title']).to eq("Livro de Teste")
      expect(material['description']).to eq("Descrição do livro de teste")
      expect(material['status']).to eq("publicado")
      expect(material['author']['name']).to eq("Autor Pessoa")
      expect(material['user']['cpf']).to eq(user.cpf)
    end
  end

  context 'when creating a book with author type institution' do
    let(:valid_input_institution) do
      {
        authorName: "Instituição Teste",
        authorType: "institution",
        personDateOfBirth: nil,
        institutionCity: "Cidade Teste",
        title: "Livro Institucional",
        description: "Descrição institucional",
        status: "enviado",
        isbn: "9788-566229202",
        pageNumbers: 100
      }
    end

    it 'creates a book and associated institution-author successfully' do
      result = graphql_query(mutation, variables: { input: valid_input_institution })

      expect(result['errors']).to be_nil

      data = result.dig('data', 'createBook')
      expect(data['errors']).to be_empty

      book_data = data['book']
      expect(book_data['isbn']).to eq("9788566229202")
      expect(book_data['pageNumbers']).to eq(100)

      material = book_data['material']
      expect(material['title']).to eq("Livro Institucional")
      expect(material['description']).to eq("Descrição institucional")
      expect(material['status']).to eq("enviado")
      expect(material['author']['name']).to eq("Instituição Teste")
      expect(material['user']['cpf']).to eq(user.cpf)
    end
  end
end
