class Book < ApplicationRecord
  self.primary_key = "isbn"
  belongs_to :material

  # validate :validade_isbn
  validates :page_numbers, presence: true, numericality: { only_integer: true, greater_than: 0 }

  def validate_isbn
    return errors.add(:isbn, "can't be blank") if isbn.blank?
    return erros.add(:isbn, "isbn must contain only numbers") unless isbn.match?(/\A\d+\z/)

    number_isbn = isbn.chars.map(&:to_i)
    errors.add(:isbn, "isbn must contain 13 digits") unless number_isbn.size == 13

    sum = 0
    number_isbn[0..11].each_with_index do |digit, index|
      sum += digit * (index.even? ? 1 : 3)
    end

    check_digit = (10 - (sum % 10)) %10

    unless check_digit == number_isbn[12]
      errors.add(:isbn, "isbn is not valid")
    end
  end
end
