require "rails_helper"

RSpec.describe Person, type: :model do
  let(:author) { create(:author) }

  let(:person) { build(:person, author: author) }

  describe "Association" do
    it "belongs to an author" do
      expect(person.author).to eq(author)
    end

    it "is invalid without an author" do
      person.author = nil
      expect(person).not_to be_valid
      expect(person.errors[:author]).to include("must exist")
    end
  end

  describe "Birth date validations" do
    context "when birth_date is blank" do
      it "is invalid and adds the error 'birth date is null'" do
        person.birth_date = nil
        expect(person).not_to be_valid
        expect(person.errors[:birth_date]).to include("birth date is null")
      end
    end

    context "when birth_date is in the future" do
      it "is invalid and adds the error 'can't be in the future'" do
        person.birth_date = Date.tomorrow
        expect(person).not_to be_valid
        expect(person.errors[:birth_date]).to include("can't be in the future")
      end
    end

    context "when birth_date is today or in the past" do
      it "is valid" do
        person.birth_date = Date.today
        expect(person).to be_valid

        person.birth_date = Date.yesterday
        expect(person).to be_valid
      end
    end
  end
end
