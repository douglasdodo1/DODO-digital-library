require "rails_helper"

RSpec.describe Article, type: :model do
  let(:material) { create(:material) }
  let(:article)  { build(:article, material: material) }

  describe "Associations" do
    it "belongs to a material" do
      assoc = Article.reflect_on_association(:material)
      expect(assoc.macro).to eq(:belongs_to)
    end

    it "is invalid without a material" do
      article.material = nil
      expect(article).not_to be_valid
      expect(article.errors[:material]).to include("must exist")
    end
  end

  describe "Validations" do
    it "is valid with a correctly formatted DOI" do
      article.doi = "10.12345/abcde123"
      expect(article).to be_valid
    end

    it "is invalid with an empty DOI" do
      article.doi = ""
      expect(article).not_to be_valid
      expect(article.errors[:doi]).to include("is invalid")
    end

    it "is invalid when DOI does not match the pattern" do
      article.doi = "1234-invalid-doi"
      expect(article).not_to be_valid
      expect(article.errors[:doi]).to include("is invalid")
    end

    it "is invalid when there are fewer than 4 digits after '10.'" do
      article.doi = "10.123/abc"
      expect(article).not_to be_valid
      expect(article.errors[:doi]).to include("is invalid")
    end

    it "is invalid when there are more than 9 digits after '10.'" do
      expect(article).not_to be_valid
      expect(article.errors[:doi]).to include("is invalid")
    end
  end
end
