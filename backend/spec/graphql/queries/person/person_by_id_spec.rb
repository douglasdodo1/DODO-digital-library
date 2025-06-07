require 'rails_helper'

RSpec.describe 'person_by_id query', type: :request do
  let!(:author) { create(:author, name: 'Maria Silva') }
  let!(:person) { create(:person, birth_date: '1990-01-01', author: author) }

  let(:query) do
    <<~GRAPHQL
      query GetPersonById($id: ID!) {
        personById(id: $id) {
          id
          birthDate
          author {
            name
          }
        }
      }
    GRAPHQL
  end

  context 'quando a pessoa existe' do
    it 'retorna a pessoa com os campos corretos' do
      result = graphql_query(query, variables: { id: person.id })

      data = result['data']['personById']

      expect(data['id']).to eq(person.id.to_s)
      expect(data['birthDate']).to eq(person.birth_date.to_s)
      expect(data['author']['name']).to eq(author.name)
    end
  end

  context 'quando a pessoa não existe' do
    it 'retorna null' do
      result = graphql_query(query, variables: { id: '99999' })

      expect(result['data']['personById']).to be_nil
    end
  end
end
