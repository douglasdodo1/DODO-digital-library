RSpec.describe Mutations::User::UpdateUser, type: :request do
  let!(:user) { create(:user, cpf: TestConstants::CPF_TEST, name: "Old Name", mail: "email@example.com", password: "123456", password_confirmation: "123456") }

  let(:mutation) do
    <<~GQL
      mutation updateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
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

  before do
    allow_any_instance_of(GraphqlController).to receive(:context).and_return({ current_user: user })
  end

  it 'updates user data successfully' do
    valid_input = {
      name: "New Name",
      mail: "newmail@example.com"
    }

    result = graphql_query(mutation, variables: { input: valid_input })

    data = result['data']['updateUser']

    expect(data['errors']).to be_empty
    expect(data['user']).to include(
      'cpf' => TestConstants::CPF_TEST,
      'name' => "New Name",
      'mail' => "newmail@example.com"
    )

    user.reload
    expect(user.name).to eq("New Name")
    expect(user.mail).to eq("newmail@example.com")
  end

  it 'updates user partially when some fields are missing' do
    partial_input = { name: "Partial Update" }

    result = graphql_query(mutation, variables: { input: partial_input })

    data = result['data']['updateUser']

    expect(data['errors']).to be_empty
    expect(data['user']).to include(
      'cpf' => TestConstants::CPF_TEST,
      'name' => "Partial Update",
      'mail' => "email@example.com"
    )

    user.reload
    expect(user.name).to eq("Partial Update")
    expect(user.mail).to eq("email@example.com")
  end
end
