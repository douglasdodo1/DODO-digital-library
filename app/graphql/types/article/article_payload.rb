module Types
  module Article
    class ArticlePayload < Types::BaseObject
      field :article, Types::Article::ArticleType, null: false
      field :errors, [String], null: false
    end
  end
end
