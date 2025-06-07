# spec/graphql/mutations/book/update_book_spec.rb
require 'rails_helper'

RSpec.describe Mutations::Book::UpdateBook, type: :request do
  let(:mutation) do
    <<~GQL
      mutation updateBook($input: UpdateBookInput!) {
        updateBook(input: $input) {
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

  let!(:owner) { User.create!(cpf: ::TestConstants::CPF_TEST, name: "Proprietário", mail: "owner@example.com", password: "password") }
  let!(:other_user) { User.create!(cpf: "90274860007", name: "Outro Usuário", mail: "other@example.com", password: "password") }

  let!(:author) do
    Author.create!(name: "Autor Original").tap do |a|
      Person.create!(author_id: a.id, birth_date: Date.new(1980, 1, 1))
    end
  end
  let!(:material) do
    Material.create!(
      title: "Título Original",
      description: "Descrição Original",
      status: "enviado",
      author_id: author.id,
      user_cpf: owner.cpf
    )
  end
  let!(:book) do
    Book.create!(
      isbn: "9788566229202",
      page_numbers: 200,
      material_id: material.id
    )
  end

  before do
    allow_any_instance_of(GraphqlController).to receive(:context).and_return({ current_user: owner })
  end

  context 'when the owner updates the book successfully' do
    let(:valid_update_input) do
      {
        isbn:            "9788566229202",               
        authorName:      "Autor Atualizado",
        authorType:      "person",
        personDateOfBirth: "1990-02-02",
        institutionCity: nil,
        title:           "Título Atualizado",
        description:     "Descrição Atualizada",
        status:          "enviado",
        pageNumbers:    300
      }
    end

    it 'updates the book, material and author correctly' do
      result = graphql_query(mutation, variables: { input: valid_update_input })

      expect(result['errors']).to be_nil

      data = result.dig('data', 'updateBook')
      expect(data['errors']).to be_empty

      book_data = data['book']
      expect(book_data['isbn']).to eq("9788566229202")
      expect(book_data['pageNumbers']).to eq(300)

      mat = book_data['material']
      expect(mat['title']).to eq("Título Atualizado")
      expect(mat['description']).to eq("Descrição Atualizada")
      expect(mat['status']).to eq("enviado")
      expect(mat['author']['name']).to eq("Autor Atualizado")
      expect(mat['user']['cpf']).to eq(owner.cpf)
    end
  end

  context 'when a non-owner attempts to update the book' do
    before do
      allow_any_instance_of(GraphqlController).to receive(:context).and_return({ current_user: other_user })
    end

    let(:attempted_update_input) do
      {
        isbn:         "9788566229202",
        authorName:   nil,
        authorType:   nil,
        personDateOfBirth: nil,
        institutionCity:   nil,
        title:        "Tentativa Maliciosa",
        description:  "Não autorizado",
        status:       "enviado",
        pageNumbers: 100
      }
    end

    it 'returns a GraphQL::ExecutionError for unauthorized user' do
      result = graphql_query(mutation, variables: { input: attempted_update_input })

      expect(result['data']).to be_nil
      expect(result['errors']).not_to be_nil
      expect(result['errors'].first['message']).to eq("Nao autorizado")
    end
  end
end
