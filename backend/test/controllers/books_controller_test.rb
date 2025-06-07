require "test_helper"

class BooksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @book = books(:one)
  end

  test "should get index" do
    get books_url, as: :json
    assert_response :success
  end

  test "should create book" do
    assert_difference("Book.count") do
      post books_url, params: { book: { age_numbers: @book.age_numbers, isbn: @book.isbn, material_id: @book.material_id, p: @book.p } }, as: :json
    end

    assert_response :created
  end

  test "should show book" do
    get book_url(@book), as: :json
    assert_response :success
  end

  test "should update book" do
    patch book_url(@book), params: { book: { age_numbers: @book.age_numbers, isbn: @book.isbn, material_id: @book.material_id, p: @book.p } }, as: :json
    assert_response :success
  end

  test "should destroy book" do
    assert_difference("Book.count", -1) do
      delete book_url(@book), as: :json
    end

    assert_response :no_content
  end
end
