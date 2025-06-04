FactoryBot.define do
  factory :user do
    cpf { '12085172440' } # substitua por um CPF para que o teste funcione
    name { 'João Silva' }
    mail { 'joao@example.com' }
    password { 'password123' }
    password_confirmation { 'password123' } 
  end
end
