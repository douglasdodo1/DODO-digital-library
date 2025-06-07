class Person < ApplicationRecord
  belongs_to :author

  validate :validate_birth_date

  private

  def validate_birth_date
    if birth_date.blank?
      errors.add(:birth_date, "birth date is null")
      return
    end

    date = Date.parse(birth_date.to_s) rescue nil


    if date.nil?
      errors.add(:birth_date, "must be a valid date")
      return
    end

    if date > Date.today
      errors.add(:birth_date, "can't be in the future")
    end
  end
end
