FactoryBot.define do
  factory :user do
    cpf { '12345678901' } 
    name { 'João Silva' }
    mail { 'joao@example.com' }
    password { 'password123' } 
    password_confirmation { 'password123' } 
  end
end
