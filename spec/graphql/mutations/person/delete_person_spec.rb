require 'rails_helper'

RSpec.describe Mutations::Person::DeletePerson, type: :request do
  let!(:author) { Author.create!(name: "Author Delete") }
  let!(:person) { Person.create!(birth_date: "1990-05-10", author_id: author.id) }

  let(:mutation) do
    <<~GQL
      mutation deletePerson($id: ID!) {
        deletePerson(id: $id) {
          success
          errors
        }
      }
    GQL
  end

  before do
    allow_any_instance_of(GraphqlController).to receive(:context).and_return({})
  end

  it 'deletes person and author successfully' do
    variables = { id: person.id.to_s }

    result = graphql_query(mutation, variables: variables)
    data = result['data']['deletePerson']

    expect(data['success']).to be true
    expect(data['errors']).to be_empty
    expect(Person.find_by(id: person.id)).to be_nil
    expect(Author.find_by(id: author.id)).to be_nil
  end
end
