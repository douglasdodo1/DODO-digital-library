FactoryBot.define do
  factory :institution do
    city { "São Paulo" }
    association :author
  end
end
