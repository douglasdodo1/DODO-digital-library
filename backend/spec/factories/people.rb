FactoryBot.define do
  factory :person do
    association :author
    birth_date { Date.new(1990, 1, 1) }
  end
end
