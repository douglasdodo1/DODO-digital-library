FactoryBot.define do
  factory :material do
    title       { "Título de Exemplo" }
    description { "Descrição de exemplo com menos de mil caracteres." }
    status      { "rascunho" }

    association :author
    association :user
  end
end
