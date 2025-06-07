require 'rails_helper'

RSpec.describe Mutations::Person::CreatePerson, type: :request do
  let(:mutation) do
    <<~GQL
      mutation createPerson($input: CreatePersonInput!) {
        createPerson(input: $input) {
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

  let(:valid_input) do
    {
      name: "João da Silva",
      birthDate: "1980-01-01"
    }
  end

  before do
    allow_any_instance_of(GraphqlController).to receive(:context).and_return({})
  end

  it 'creates a person and author successfully' do
    result = graphql_query(mutation, variables: { input: valid_input })

    data = result['data']['createPerson']

    expect(data['errors']).to be_empty
    expect(data['person']['author']['name']).to eq("João da Silva")
    expect(data['person']['birthDate']).to eq("1980-01-01")
  end
end
