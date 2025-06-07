class Video < ApplicationRecord
  belongs_to :material
  validates :duration_minutes, presence: true, numericality: { only_integer: true, greater_than: 0 }
end
