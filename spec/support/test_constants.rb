puts "Loading TestConstants module..."

module TestConstants
  CPF_TEST = "12085172440"
end

RSpec.configure do |config|
  config.include TestConstants
end
