require "rails_helper"

RSpec.describe Video, type: :model do
  let(:material) { create(:material) }
  let(:video)    { build(:video, material: material) }

  describe "Associations" do
    it "belongs to a material" do
      assoc = Video.reflect_on_association(:material)
      expect(assoc.macro).to eq(:belongs_to)
    end

    it "is invalid without a material" do
      video.material = nil
      expect(video).not_to be_valid
      expect(video.errors[:material]).to include("must exist")
    end
  end

  describe "Validations" do
    context "duration_minutes" do
      it "is valid with a positive integer" do
        video.duration_minutes = 25
        expect(video).to be_valid
      end

      it "is invalid without duration_minutes" do
        video.duration_minutes = nil
        expect(video).not_to be_valid
        expect(video.errors[:duration_minutes]).to include("can't be blank")
      end

      it "is invalid when duration_minutes is not an integer" do
        video.duration_minutes = 5.5
        expect(video).not_to be_valid
        expect(video.errors[:duration_minutes]).to include("must be an integer")
      end

      it "is invalid when duration_minutes is less than or equal to 0" do
        video.duration_minutes = 0
        expect(video).not_to be_valid
        expect(video.errors[:duration_minutes]).to include("must be greater than 0")
      end
    end
  end
end
