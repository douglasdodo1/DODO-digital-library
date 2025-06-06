require "test_helper"

class InstitutionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @institution = institutions(:one)
  end

  test "should get index" do
    get institutions_url, as: :json
    assert_response :success
  end

  test "should create institution" do
    assert_difference("Institution.count") do
      post institutions_url, params: { institution: { author_id: @institution.author_id, city: @institution.city } }, as: :json
    end

    assert_response :created
  end

  test "should show institution" do
    get institution_url(@institution), as: :json
    assert_response :success
  end

  test "should update institution" do
    patch institution_url(@institution), params: { institution: { author_id: @institution.author_id, city: @institution.city } }, as: :json
    assert_response :success
  end

  test "should destroy institution" do
    assert_difference("Institution.count", -1) do
      delete institution_url(@institution), as: :json
    end

    assert_response :no_content
  end
end
