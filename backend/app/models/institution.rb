class Institution < ApplicationRecord
  belongs_to :author

  validates :city, presence: true, length: { minimum: 2, maximum: 80 }
end
