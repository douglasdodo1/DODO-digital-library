require 'rails_helper'

RSpec.describe 'UserByCpf Query', type: :request do
  let!(:user) do
    create(:user,
      cpf: '12345678901',
      name: 'João Silva',
      mail: 'joao@example.com',
      password: 'password123',
      password_confirmation: 'password123'
    )
  end

  let(:query) do
    <<~GRAPHQL
      query($cpf: String!) {
        userByCpf(cpf: $cpf) {
          cpf
          name
          mail
        }
      }
    GRAPHQL
  end

  let(:headers) { { 'CONTENT_TYPE' => 'application/json' } }

  context 'when user exists' do
    it 'returns the user by cpf' do
      post '/graphql',
           params: { query: query, variables: { cpf: user.cpf } }.to_json,
           headers: headers

      json = JSON.parse(response.body)
      data = json['data']['userByCpf']

      expect(data['cpf']).to eq(user.cpf)
      expect(data['name']).to eq(user.name)
      expect(data['mail']).to eq(user.mail)
    end
  end

  context 'when user does not exist' do
    it 'returns null' do
      post '/graphql',
           params: { query: query, variables: { cpf: '00000000000' } }.to_json,
           headers: headers

      json = JSON.parse(response.body)
      data = json['data']['userByCpf']

      expect(data).to be_nil
    end
  end
end
