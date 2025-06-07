class Book < ApplicationRecord
  self.primary_key = "isbn"
  belongs_to :material

  validate :validate_isbn
  validates :page_numbers, presence: true, numericality: { only_integer: true, greater_than: 0 }

  def validate_isbn
    return errors.add(:isbn, "can't be blank") if isbn.blank?

    clean_isbn = isbn.gsub(/\D/, '')

    unless clean_isbn.match?(/\A\d{13}\z/)
      return errors.add(:isbn, "must contain exactly 13 digits")
    end

    digits = clean_isbn.chars.map(&:to_i)



    sum = digits[0..11].each_with_index.sum do |digit, index|
      index.even? ? digit : digit * 3
    end

    check_digit = (10 - (sum % 10)) % 10

    unless check_digit == digits[12]
      errors.add(:isbn, "is not valid")
    end
  end

end
