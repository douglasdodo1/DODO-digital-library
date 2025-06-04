require 'rails_helper'

RSpec.describe Person, type: :model do
  let(:author) { create(:author) }

  subject { build(:person, author: author, birth_date: Date.new(1990, 1, 1)) }

  describe 'associations' do
    it { should belong_to(:author) }
  end

  describe 'validations' do
    context 'when birth_date is valid' do
      it 'is valid with a birth_date in the past' do
        expect(subject).to be_valid
      end
    end

    context 'when birth_date is nil' do
      before { subject.birth_date = nil }

      it 'is invalid' do
        expect(subject).not_to be_valid
        expect(subject.errors[:birth_date]).to include("birth date is null")
      end
    end

    context 'when birth_date is not a valid date' do
      before { subject.birth_date = 'invalid-date' }

      it 'is invalid' do
        expect(subject).not_to be_valid
        expect(subject.errors[:birth_date]).to include("must be a valid date")
      end
    end

    context 'when birth_date is in the future' do
      before { subject.birth_date = Date.tomorrow }

      it 'is invalid' do
        expect(subject).not_to be_valid
        expect(subject.errors[:birth_date]).to include("can't be in the future")
      end
    end
  end
end
