FactoryBot.define do
  factory :article do
    # Exemplo de DOI válido: deve começar com "10.", seguido de 4–9 dígitos, "/", e então qualquer sequência não-vazia de caracteres
    doi { "10.123oo45/uniqueID" }

    association :material
  end
end
