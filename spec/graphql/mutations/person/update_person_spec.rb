require 'rails_helper'

RSpec.describe Mutations::Person::UpdatePerson, type: :request do
  let!(:author) { Author.create!(name: "Old Author Name") }
  let!(:person) { Person.create!(birth_date: "1975-12-12", author_id: author.id) }

  let(:mutation) do
    <<~GQL
      mutation updatePerson($id: ID!, $name: String, $birthDate: ISO8601Date) {
        updatePerson(id: $id, name: $name, birthDate: $birthDate) {
          person {
            id
            birthDate
            author {
              id
              name
            }
          }
          errors
        }
      }
    GQL
  end

  before do
    allow_any_instance_of(GraphqlController).to receive(:context).and_return({})
  end

  it 'updates name and birthDate successfully' do
    variables = {
      id: person.id.to_s,
      name: "New Author Name",
      birthDate: "1985-06-20"
    }

    result = graphql_query(mutation, variables: variables)
    data = result['data']['updatePerson']

    expect(data['errors']).to be_empty
    expect(data['person']['birthDate']).to eq("1985-06-20")
    expect(data['person']['author']['name']).to eq("New Author Name")

    person.reload
    author.reload
    expect(person.birth_date.to_s).to eq("1985-06-20")
    expect(author.name).to eq("New Author Name")
  end

  it 'updates partially when only name is given' do
    variables = {
      id: person.id.to_s,
      name: "Partial Name Update"
    }

    result = graphql_query(mutation, variables: variables)
    data = result['data']['updatePerson']

    expect(data['errors']).to be_empty
    expect(data['person']['author']['name']).to eq("Partial Name Update")
    expect(data['person']['birthDate']).to eq(person.birth_date.to_s)

    author.reload
    expect(author.name).to eq("Partial Name Update")
  end

  it 'updates partially when only birthDate is given' do
    variables = {
      id: person.id.to_s,
      birthDate: "1999-09-09"
    }

    result = graphql_query(mutation, variables: variables)
    data = result['data']['updatePerson']

    expect(data['errors']).to be_empty
    expect(data['person']['birthDate']).to eq("1999-09-09")
    expect(data['person']['author']['name']).to eq(author.name)

    person.reload
    expect(person.birth_date.to_s).to eq("1999-09-09")
  end
end
