class User < ApplicationRecord
  self.primary_key = "cpf"
  has_secure_password

  validate :valid_cpf
  validates :name, presence: true, length: { minimum: 2, maximum: 30 }
  validates :mail, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }

  def valid_cpf
    if cpf.nil?
      errors.add(:cpf, "can't be blank")
      return
    end

    unless cpf.match?(/\A\d+\z/)
      errors.add(:cpf, "must contain only numbers")
      return
    end

    if cpf.length != 11
    errors.add(:cpf, "must contain exactly 11 digits")
    return
    end

    if cpf.chars.uniq.length == 1
      errors.add(:cpf, "cannot be a sequence of the same digit")
      return
    end

    sum = 0
    first_number_check = 0
    second_number_check = 0

    number_cpf = cpf.chars.map(&:to_i)

    9.times do |i|
      sum += number_cpf[i] * (10 - i)
    end

    first_number_check = (sum*10) % 11
    first_number_check = 0 if first_number_check == 10

    unless first_number_check == number_cpf[9]
      errors.add(:cpf, "is not valid")
      return
    end

    sum = 0

    10.times do |i|
      sum += number_cpf[i] * (11-i)
    end

    second_number_check = (sum*10) % 11
    second_number_check = 0 if second_number_check == 10

    unless second_number_check == number_cpf[10]
      errors.add(:cpf, "is not valid")
    end
  end
end
