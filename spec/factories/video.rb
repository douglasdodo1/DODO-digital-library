FactoryBot.define do
  factory :video do
    duration_minutes { 10 }
    association :material
  end
end
