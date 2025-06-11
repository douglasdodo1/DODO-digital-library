Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  match "/graphql", to: proc { [204, {}, ['']] }, via: [:options]


  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
