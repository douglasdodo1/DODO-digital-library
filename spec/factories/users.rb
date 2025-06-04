FactoryBot.define do
  factory :user do
    cpf { TestConstants::CPF_TEST }
    name { 'João Silva' }
    mail { 'joao@example.com' }
    password { 'password123' }
    password_confirmation { 'password123' }
  end
end
