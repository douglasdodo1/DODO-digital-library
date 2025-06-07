# spec/graphql/mutations/user/delete_user_spec.rb
require 'rails_helper'

RSpec.describe Mutations::User::DeleteUser, type: :request do
  let(:mutation) do
    <<~GQL
      mutation deleteUser($input: DeleteUserInput!) {
        deleteUser(input: $input) {
          success
          errors
        }
      }
    GQL
  end

  let!(:user) { User.create!(cpf: TestConstants::CPF_TEST, name: 'Delete Me', mail: 'delete@me.com', password: 'password123') }

  let(:valid_input) do
    {
      cpf: TestConstants::CPF_TEST
    }
  end

  before do
    allow_any_instance_of(GraphqlController).to receive(:context).and_return({ current_user: user })
  end

  it 'deletes the user successfully' do
    result = graphql_query(mutation, variables: { input: valid_input })

    expect(result['data']).not_to be_nil
    data = result['data']['deleteUser']

    expect(data['success']).to be true
    expect(data['errors']).to be_empty
    expect(User.find_by(cpf: user.cpf)).to be_nil
  end
end
