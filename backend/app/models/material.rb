class Material < ApplicationRecord
  belongs_to :author
  belongs_to :user, foreign_key: :user_cpf, primary_key: :cpf

  has_one :book
  has_one :article
  has_one :video

  validates :title, presence: true, length: { minimum: 3, maximum: 100 }
  validates :description, length: { maximum: 1000 }
  validates :status, presence: true, inclusion: { in: %w[rascunho publicado enviado],
  message: "must bem 'rascunho', 'publicado', 'enviado'" }
end
