module Types
  class MutationType < Types::BaseObject
    # USER-MUTATIONS
    field :create_user, mutation: Mutations::User::CreateUser
    field :update_user, mutation: Mutations::User::UpdateUser
    field :delete_user, mutation: Mutations::User::DeleteUser
    field :login_user, mutation: Mutations::User::LoginUser

    # PERSON-MUTATIONS
    field :create_person, mutation: Mutations::Person::CreatePerson
    field :update_person, mutation: Mutations::Person::UpdatePerson
    field :delete_person, mutation: Mutations::Person::DeletePerson

    # INSTITUTION-MUTATIONS
    field :create_institution, mutation: Mutations::Institution::CreateInstitution
    field :update_institution, mutation: Mutations::Institution::UpdateInstitution
    field :delete_institution, mutation: Mutations::Institution::DeleteInstitution

    # BOOK-MUTATIONS
    field :create_book, mutation: Mutations::Book::CreateBook
    field :update_book, mutation: Mutations::Book::UpdateBook
    field :delete_book, mutation: Mutations::Book::DeleteBook

    # VIDEO-MUTATIONS
    field :create_video, mutation: Mutations::Video::CreateVideo
    field :update_video, mutation: Mutations::Video::UpdateVideo
    field :delete_video, mutation: Mutations::Video::DeleteVideo

    # ARTICLE-MUTATIONS
    field :create_article, mutation: Mutations::Article::CreateArticle
    field :update_article, mutation: Mutations::Article::UpdateArticle
    field :delete_article, mutation: Mutations::Article::DeleteArticle
  end
end
