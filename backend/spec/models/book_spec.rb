require "rails_helper"

RSpec.describe Book, type: :model do
  let(:material) { create(:material) }
  let(:book)     { build(:book, material: material) }

  describe "Associations" do
    it "belongs to a material" do
      assoc = Book.reflect_on_association(:material)
      expect(assoc.macro).to eq(:belongs_to)
    end

    it "is invalid without a material" do
      book.material = nil
      expect(book).not_to be_valid
      expect(book.errors[:material]).to include("must exist")
    end
  end

  describe "Validations" do
    context "ISBN" do
      it "is valid with a correctly formatted 13-digit ISBN" do
        book.isbn = "9780306406157"
        expect(book).to be_valid
      end

      it "is invalid without an ISBN" do
        book.isbn = nil
        expect(book).not_to be_valid
        expect(book.errors[:isbn]).to include("can't be blank")
      end

      it "is invalid when ISBN has an incorrect check digit" do
        book.isbn = "9780306406158"
        expect(book).not_to be_valid
        expect(book.errors[:isbn]).to include("is not valid")
      end
    end

    context "page_numbers" do
      it "is valid with a positive integer" do
        book.page_numbers = 150
        expect(book).to be_valid
      end

      it "is invalid without page_numbers" do
        book.page_numbers = nil
        expect(book).not_to be_valid
        expect(book.errors[:page_numbers]).to include("can't be blank")
      end

      it "is invalid when page_numbers is not an integer" do
        book.page_numbers = 12.5
        expect(book).not_to be_valid
        expect(book.errors[:page_numbers]).to include("must be an integer")
      end

      it "is invalid when page_numbers is less than or equal to 0" do
        book.page_numbers = 0
        expect(book).not_to be_valid
        expect(book.errors[:page_numbers]).to include("must be greater than 0")
      end
    end
  end
end
