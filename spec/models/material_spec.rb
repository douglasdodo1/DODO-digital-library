require "rails_helper"

RSpec.describe Material, type: :model do
  let(:author) { create(:author) }
  let(:user)   { create(:user) }
  let(:material) { build(:material, author: author, user: user) }

  describe "Associations" do
    it "belongs to an author" do
      assoc = Material.reflect_on_association(:author)
      expect(assoc.macro).to eq(:belongs_to)
    end

    it "belongs to a user (foreign_key: user_cpf)" do
      assoc = Material.reflect_on_association(:user)
      expect(assoc.macro).to eq(:belongs_to)
      expect(assoc.options[:foreign_key]).to eq(:user_cpf)
      expect(assoc.options[:primary_key]).to eq(:cpf)
    end

    it "has one book" do
      assoc = Material.reflect_on_association(:book)
      expect(assoc.macro).to eq(:has_one)
    end

    it "has one article" do
      assoc = Material.reflect_on_association(:article)
      expect(assoc.macro).to eq(:has_one)
    end

    it "has one video" do
      assoc = Material.reflect_on_association(:video)
      expect(assoc.macro).to eq(:has_one)
    end
  end

  describe "Validations" do
    context "title" do
      it "is valid with a title of acceptable length" do
        material.title = "Valid Title"
        expect(material).to be_valid
      end

      it "is invalid without a title" do
        material.title = nil
        expect(material).not_to be_valid
        expect(material.errors[:title]).to include("can't be blank")
      end

      it "is invalid when title is too short" do
        material.title = "AB"
        expect(material).not_to be_valid
        expect(material.errors[:title]).to include("is too short (minimum is 3 characters)")
      end

      it "is invalid when title is too long" do
        material.title = "A" * 101
        expect(material).not_to be_valid
        expect(material.errors[:title]).to include("is too long (maximum is 100 characters)")
      end
    end

    context "description" do
      it "is valid with a description of acceptable length" do
        material.description = "Some description within limits."
        expect(material).to be_valid
      end

      it "is invalid when description is too long" do
        material.description = "A" * 1001
        expect(material).not_to be_valid
        expect(material.errors[:description]).to include("is too long (maximum is 1000 characters)")
      end
    end

    context "status" do
      it "is valid with a permitted status" do
        %w[rascunho publicado enviado].each do |valid_status|
          material.status = valid_status
          expect(material).to be_valid
        end
      end

      it "is invalid without a status" do
        material.status = nil
        expect(material).not_to be_valid
        expect(material.errors[:status]).to include("can't be blank")
      end

      it "is invalid with a status not in the list" do
        material.status = "invalid_status"
        expect(material).not_to be_valid
        expect(material.errors[:status]).to include("must bem 'rascunho', 'publicado', 'enviado'")
      end
    end
  end
end
