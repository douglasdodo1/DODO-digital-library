require 'rails_helper'

RSpec.describe 'book_by_isbn query', type: :request do
  let!(:author)   { create(:author, name: 'Book Author') }
  let!(:material) { create(:material, title: 'Test Book', author: author) }
  let!(:book)     { create(:book, isbn: '9780306406157', material: material) }

  let(:query) do
    <<~GRAPHQL
      query GetBookByIsbn($isbn: String!) {
        bookByIsbn(isbn: $isbn) {
          isbn
          material {
            title
            author {
              name
            }
          }
        }
      }
    GRAPHQL
  end

  it 'returns the correct book data' do
    result = graphql_query(query, variables: { isbn: book.isbn })

    data = result['data']['bookByIsbn']
    expect(data['isbn']).to eq(book.isbn)
    expect(data['material']['title']).to eq('Test Book')
    expect(data['material']['author']['name']).to eq('Book Author')
  end

  it 'returns null if book is not found' do
    result = graphql_query(query, variables: { isbn: '0000000000000' })

    expect(result['data']['bookByIsbn']).to be_nil
  end
end
