require 'rails_helper'

RSpec.describe 'institution_by_id query', type: :request do
  let!(:author) { create(:author, name: 'John Doe') }
  let!(:institution) { create(:institution, city: 'New York', author: author) }

  let(:query) do
    <<~GQL
      query GetInstitutionById($id: ID!) {
        institutionById(id: $id) {
          id
          city
          author {
            name
          }
        }
      }
    GQL
  end

  it 'returns the institution for a valid ID' do
    result = graphql_query(query, variables: { id: institution.id })

    data = result['data']['institutionById']
    expect(data['id']).to eq(institution.id.to_s)
    expect(data['city']).to eq(institution.city)
    expect(data['author']['name']).to eq(author.name)
  end

  it 'returns null for a non-existent ID' do
    result = graphql_query(query, variables: { id: '99999' })

    expect(result['data']['institutionById']).to be_nil
  end
end
