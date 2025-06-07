require 'rails_helper'

RSpec.describe Mutations::Institution::DeleteInstitution, type: :request do
  let(:mutation) do
    <<~GQL
      mutation deleteInstitution($input: DeleteInstitutionInput!) {
        deleteInstitution(input: $input) {
          success
          errors
        }
      }
    GQL
  end

  let!(:author) { Author.create!(name: "Instituto que será deletado") }
  let!(:institution) { Institution.create!(city: "Rio de Janeiro", author: author) }

  it 'deletes the institution successfully' do
    result = graphql_query(mutation, variables: { input: { id: institution.id } })

    data = result.dig('data', 'deleteInstitution')

    expect(data['success']).to be true
    expect(data['errors']).to be_empty
    expect(Institution.find_by(id: institution.id)).to be_nil
  end
end
