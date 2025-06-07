require "rails_helper"

RSpec.describe Author, type: :model do
  let(:author) { build(:author) }

  describe "Validations" do
    it "is valid with a valid name" do
      expect(author).to be_valid
    end

    it "is invalid without a name" do
      author.name = nil
      expect(author).not_to be_valid
      expect(author.errors[:name]).to include("can't be blank")
    end

    it "is invalid when name is too short" do
      author.name = "AB"
      expect(author).not_to be_valid
      expect(author.errors[:name]).to include("is too short (minimum is 3 characters)")
    end

    it "is invalid when name is too long" do
      author.name = "A" * 121
      expect(author).not_to be_valid
      expect(author.errors[:name]).to include("is too long (maximum is 120 characters)")
    end
  end

  describe "Associations" do
    it "can have one person associated" do
      assoc = Author.reflect_on_association(:person)
      expect(assoc.macro).to eq(:has_one)
    end

    it "can have one institution associated" do
      assoc = Author.reflect_on_association(:institution)
      expect(assoc.macro).to eq(:has_one)
    end
  end
end
