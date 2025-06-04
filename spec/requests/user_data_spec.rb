require 'rails_helper'

RSpec.describe 'User data', type: :request do
  let!(:user) { create(:user) }

  let(:headers) { { 'CONTENT_TYPE' => 'application/json' } }

  describe 'User model validations' do
    it 'is invalid with an improperly formatted CPF' do
      user = build(:user, cpf: '123')
      expect(user).not_to be_valid
      expect(user.errors[:cpf]).to include("is invalid").or include("cpf must contain exactly 11 digits").or include("não é válido")
    end

    let!(:existing_user) { create(:user, cpf: "12345678909") }

    it "is invalid with duplicate cpf" do
      user = build(:user, cpf: "12345678909")
      expect(user).not_to be_valid
      expect(user.errors[:cpf]).to include("has already been taken")
    end


    it 'is invalid without a name' do
      user = build(:user, name: nil)
      expect(user).not_to be_valid
      expect(user.errors[:name]).to include("can't be blank")
    end

    it 'is invalid without a mail' do
      user = build(:user, mail: nil)
      expect(user).not_to be_valid
      expect(user.errors[:mail]).to include("can't be blank")
    end

    it 'is invalid without a password' do
      user = build(:user, password: nil)
      expect(user).not_to be_valid
      expect(user.errors[:password]).to include("can't be blank")
    end

    it 'is invalid when password confirmation does not match' do
      user = build(:user, password: 'password123', password_confirmation: 'different')
      expect(user).not_to be_valid
      expect(user.errors[:password_confirmation]).to include("doesn't match Password")
    end

    it 'is invalid when password is too short' do
      user = build(:user, password: '123', password_confirmation: '123')
      expect(user).not_to be_valid
      expect(user.errors[:password]).to include(a_string_including("is too short"))
    end
  end
end
