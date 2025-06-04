puts "Loading TestConstants module..."

module TestConstants
  CPF_TEST = "REAL CPF HERE"
end

RSpec.configure do |config|
  config.include TestConstants
end
