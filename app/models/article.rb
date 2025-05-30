class Article < ApplicationRecord
  self.primary_key = "doi"
  belongs_to :material
end
