require 'rails_helper'

RSpec.describe Mutations::Person::UpdatePerson, type: :request do
  let(:mutation) do
    <<~GQL
      mutation updatePerson($input: UpdatePersonInput!) {
        updatePerson(input: $input) {
          person {
            id
            birthDate
            author {
              name
            }
          }
          errors
        }
      }
    GQL
  end

  let!(:author)   { Author.create!(name: "Original Author") }
  let!(:person)   { Person.create!(birth_date: Date.new(1990, 1, 1), author: author) }

  let(:new_name)      { "Updated Author" }
  let(:new_birthdate) { Date.new(1992, 2, 2) }

  let(:variables) do
    {
      input: {
        id:         person.id,
        name:       new_name,
        birthDate:  new_birthdate.iso8601
      }
    }
  end

  it 'updates the person and author successfully' do
    result = graphql_query(mutation, variables: variables)

    expect(result['errors']).to be_nil

    data = result.dig('data', 'updatePerson')
    expect(data['errors']).to be_empty
    expect(data['person']['author']['name']).to eq(new_name)
    expect(data['person']['birthDate']).to eq(new_birthdate.iso8601)
  end
end