require 'rails_helper'

RSpec.describe Mutations::Institution::CreateInstitution, type: :request do
  let(:mutation) do
    <<~GQL
      mutation createInstitution($input: CreateInstitutionInput!) {
        createInstitution(input: $input) {
          institution {
            id
            city
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
      name: "Instituto Alpha",
      city: "São Paulo"
    }
  end

  it 'creates an institution and author successfully' do
    result = graphql_query(mutation, variables: { input: valid_input })

    data = result.dig('data', 'createInstitution')

    expect(data['errors']).to be_empty
    expect(data['institution']['author']['name']).to eq("Instituto Alpha")
    expect(data['institution']['city']).to eq("São Paulo")
    expect(data['institution']['id']).not_to be_nil
  end
end
