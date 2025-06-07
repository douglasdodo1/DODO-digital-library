require 'rails_helper'

RSpec.describe Mutations::User::CreateUser, type: :request do
  let(:mutation) do
    <<~GQL
      mutation createUser($input: CreateUserInput!) {
        createUser(input: $input) {
          user {
            cpf
            name
            mail
          }
          errors
        }
      }
    GQL
  end

  let(:valid_input) do
    {
      cpf: TestConstants::CPF_TEST,
      name: "Test User",
      mail: "test@user.com",
      password: "password123"
    }
  end

  it 'creates a user with valid data' do
    result = graphql_query(mutation, variables: { input: valid_input })

    data = result['data']['createUser']

    expect(data['errors']).to be_empty
    expect(data['user']).to include(
      'cpf' => TestConstants::CPF_TEST,
      'name' => 'Test User',
      'mail' => 'test@user.com'
    )
  end

  it 'returns error when required fields are missing' do
    invalid_input = valid_input.except(:cpf)

    result = graphql_query(mutation, variables: { input: invalid_input })

    expect(result['errors']).not_to be_nil
  end
end
