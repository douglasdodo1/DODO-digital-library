# spec/support/graphql_helpers.rb
module GraphqlHelpers
  def graphql_query(query, variables: {})
    post '/graphql', params: { query: query, variables: variables.to_json }, as: :json
    JSON.parse(response.body)
  end
end


RSpec.configure do |config|
  config.include GraphqlHelpers, type: :request
end
