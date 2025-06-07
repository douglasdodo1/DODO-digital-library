require "rails_helper"

RSpec.describe Institution, type: :model do
  let(:author) { create(:author) }
  let(:institution) { build(:institution, author: author) }

  describe "Association" do
    it "belongs to an author" do
      assoc = Institution.reflect_on_association(:author)
      expect(assoc.macro).to eq(:belongs_to)
    end

    it "is invalid without an author" do
      institution.author = nil
      expect(institution).not_to be_valid
      expect(institution.errors[:author]).to include("must exist")
    end
  end

  describe "City validations" do
    it "is valid with a valid city and author" do
      expect(institution).to be_valid
    end

    it "is invalid without a city" do
      institution.city = nil
      expect(institution).not_to be_valid
      expect(institution.errors[:city]).to include("can't be blank")
    end

    it "is invalid when city is too short" do
      institution.city = "A"
      expect(institution).not_to be_valid
      expect(institution.errors[:city]).to include("is too short (minimum is 2 characters)")
    end

    it "is invalid when city is too long" do
      institution.city = "A" * 81
      expect(institution).not_to be_valid
      expect(institution.errors[:city]).to include("is too long (maximum is 80 characters)")
    end
  end
end
