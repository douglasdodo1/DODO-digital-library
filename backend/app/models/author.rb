class Author < ApplicationRecord
  has_one :person
  has_one :institution

  validates :name, presence: true, length: { minimum: 3, maximum: 120 }
end
