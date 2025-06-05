puts "Loading TestConstants module..."

module TestConstants
  CPF_TEST = "76912888089"
end

RSpec.configure do |config|
  config.include TestConstants
end
