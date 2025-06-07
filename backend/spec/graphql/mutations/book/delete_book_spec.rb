# spec/graphql/mutations/book/delete_book_spec.rb
require 'rails_helper'

RSpec.describe Mutations::Book::DeleteBook, type: :request do
  let(:mutation) do
    <<~GQL
      mutation deleteBook($input: DeleteBookInput!) {
        deleteBook(input: $input) {
          success
          errors
        }
      }
    GQL
  end

  let!(:owner) { User.create!(cpf: ::TestConstants::CPF_TEST, name: "Owner User", mail: "owner@example.com", password: "password") }
  let!(:other_user) { User.create!(cpf: "44091537065", name: "Other User", mail: "other@example.com", password: "password") }

  let!(:author) { Author.create!(name: "Test Author") }
  let!(:material) do
    Material.create!(
      title: "Test Title",
      description: "Test Description",
      status: "enviado",
      author_id: author.id,
      user_cpf: owner.cpf
    )
  end
  let!(:book) do
    Book.create!(
      isbn: "9788566229202",
      page_numbers: 150,
      material_id: material.id
    )
  end

  context 'when the owner deletes successfully' do
    before do
      allow_any_instance_of(GraphqlController).to receive(:context).and_return({ current_user: owner })
    end

    let(:variables) do
      {
        input: {
          isbn: "9788566229202"
        }
      }
    end

    it 'removes the book and its associated material' do
      result = graphql_query(mutation, variables: variables)

      expect(result['errors']).to be_nil

      data = result.dig('data', 'deleteBook')
      expect(data['success']).to be true
      expect(data['errors']).to be_empty

      expect(Book.find_by(isbn: "9788566229202")).to be_nil
      expect(Material.find_by(id: material.id)).to be_nil
    end
  end

  context 'when a non-owner attempts to delete' do
    before do
      allow_any_instance_of(GraphqlController).to receive(:context).and_return({ current_user: other_user })
    end

    let(:variables) do
      {
        input: {
          isbn: "9788566229202"
        }
      }
    end

  end

  context 'when the ISBN does not exist' do
    before do
      allow_any_instance_of(GraphqlController).to receive(:context).and_return({ current_user: owner })
    end

    let(:variables) do
      {
        input: {
          isbn: "0000000000000" 
        }
      }
    end

    it 'returns success false and a record not found error' do
      result = graphql_query(mutation, variables: variables)

      data = result.dig('data', 'deleteBook')
      expect(data['success']).to be false
      expect(data['errors'].first).to match(/Couldn't find Book/)
    end
  end
end
