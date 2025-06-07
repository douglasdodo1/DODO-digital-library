require 'rails_helper'

RSpec.describe 'user_by_cpf query', type: :request do
  let!(:user) { create(:user, cpf: '12085172440') }

  let(:query) do
    <<~GQL
      query GetUserByCpf($cpf: String!) {
        userByCpf(cpf: $cpf) {
          cpf
          name
          mail
        }
      }
    GQL
  end

  it 'returns the user for a valid CPF' do
    result = graphql_query(query, variables: { cpf: '12085172440' })

    data = result['data']['userByCpf']
    expect(data['cpf']).to eq(user.cpf)
    expect(data['name']).to eq(user.name)
    expect(data['mail']).to eq(user.mail)
  end

  it 'returns null for a non-existent CPF' do
    result = graphql_query(query, variables: { cpf: '00000000000' })

    expect(result['data']['userByCpf']).to be_nil
  end
end
