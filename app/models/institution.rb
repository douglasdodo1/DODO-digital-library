class Institution < ApplicationRecord
  belongs_to :author

  validates :city, presence: true, lenght: { minimum: 2, maximum: 80 }
end
