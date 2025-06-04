require "rails_helper"

RSpec.describe User, type: :model do
  let(:user) { build(:user) }

  describe "cpf validation" do
    it "is valid with valid attributes" do
      expect(user).to be_valid
    end

    it "is invalid without a CPF" do
      user.cpf = nil
      expect(user).not_to be_valid
      expect(user.errors[:cpf]).to include("can't be blank")
    end

    it "is invalid when CPF contains non-numeric characters" do
      user.cpf = "123.456.789-00"
      expect(user).not_to be_valid
      expect(user.errors[:cpf]).to include("must contain only numbers")
    end

    it "is invalid when CPF does not contain exactly 11 digits" do
      user.cpf = "112345678900"
      expect(user).not_to be_valid
      expect(user.errors[:cpf]).to include("must contain exactly 11 digits")
    end

    it "is invalid when CPF is a sequence of the same digit" do
      user.cpf = "11111111111"
      expect(user).not_to be_valid
      expect(user.errors[:cpf]).to include("cannot be a sequence of the same digit")
    end

    it "is invalid when CPF is not valid" do
      user.cpf = "11234567890"
      expect(user).not_to be_valid
      expect(user.errors[:cpf]).to include("is not valid")
    end
  end

  describe "name validation" do
    it "is invalid without a name" do
      user.name = nil
      expect(user).not_to be_valid
      expect(user.errors[:name]).to include("can't be blank")
    end

    it "is invalid when name is too short" do
      user.name = "A"
      expect(user).not_to be_valid
      expect(user.errors[:name]).to include("is too short (minimum is 2 characters)")
    end

    it "is invalid when name is too long" do
      user.name = "A" * 31
      expect(user).not_to be_valid
      expect(user.errors[:name]).to include("is too long (maximum is 30 characters)")
    end
  end

  describe "mail validation" do
    it "is invalid without a mail" do
      user.mail = nil
      expect(user).not_to be_valid
      expect(user.errors[:mail]).to include("can't be blank")
    end

    it "is invalid when mail is duplicated" do
      user.save!
      user2 = build(:user, mail: user.mail)
      expect(user2).not_to be_valid
      expect(user2.errors[:mail]).to include("has already been taken")
    end
  end

  describe "password validation" do
    it "is invalid without a password" do
      user.password = nil
      expect(user).not_to be_valid
      expect(user.errors[:password]).to include("can't be blank")
    end

    it "is invalid when password is too short" do
      user.password = "123"
      expect(user).not_to be_valid
      expect(user.errors[:password]).to include("is too short (minimum is 6 characters)")
    end
  end
end
