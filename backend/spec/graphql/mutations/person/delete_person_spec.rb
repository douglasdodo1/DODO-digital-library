require 'rails_helper'

RSpec.describe Mutations::Person::DeletePerson, type: :request do
  let(:mutation) do
    <<~GQL
      mutation deletePerson($input: DeletePersonInput!) {
        deletePerson(input: $input) {
          success
          errors
        }
      }
    GQL
  end

  let!(:author) { Author.create!(name: "Test Author") }
  let!(:person) { Person.create!(birth_date: Date.new(1990, 1, 1), author: author) }

  let(:variables) do
    {
      input: {
        id: person.id
      }
    }
  end

  it 'deletes the person and associated author successfully' do
    result = graphql_query(mutation, variables: variables)

    expect(result['errors']).to be_nil

    data = result.dig('data', 'deletePerson')
    expect(data['success']).to be true
    expect(data['errors']).to be_empty
    expect(Person.find_by(id: person.id)).to be_nil
    expect(Author.find_by(id: author.id)).to be_nil
  end
end