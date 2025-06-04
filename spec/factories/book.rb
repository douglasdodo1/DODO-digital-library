FactoryBot.define do
  factory :book do
    isbn { "9780306406157" }
    page_numbers { 100 }

    association :material
  end
end
