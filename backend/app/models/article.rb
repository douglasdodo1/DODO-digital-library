class Article < ApplicationRecord
  self.primary_key = "doi"
  belongs_to :material

  validates :doi, format: { with: /\A10\.\d{4,9}\/\S+\z/ }
end
