class Material < ApplicationRecord
  belongs_to :author
  belongs_to :user

  has_one :book
  has_one :article
  has_one :video
end
