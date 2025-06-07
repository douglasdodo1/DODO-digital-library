require 'rails_helper'

RSpec.describe Mutations::Institution::UpdateInstitution, type: :request do
  let(:mutation) do
    <<~GQL
      mutation updateInstitution($input: UpdateInstitutionInput!) {
        updateInstitution(input: $input) {
          institution {
            id
            city
            author {
              name
            }
          }
          errors
        }
      }
    GQL
  end

  let!(:author)      { Author.create!(name: "Instituto Original") }
  let!(:institution) { Institution.create!(city: "Brasília", author: author) }

  # Usamos símbolos para ficar idêntico ao teste de CreateInstitution
  let(:updated_input) do
    {
      id:   institution.id,
      name: "Instituto Atualizado",
      city: "Curitiba"
    }
  end

  it 'atualiza a instituição e o author com sucesso' do
    result = graphql_query(
      mutation,
      variables: { input: updated_input }
    )

    # Se houver qualquer erro de esquema/variável, result['errors'] não será nil
    expect(result['errors']).to be_nil

    data = result['data']['updateInstitution']
    expect(data['errors']).to be_empty
    expect(data['institution']['author']['name']).to eq("Instituto Atualizado")
    expect(data['institution']['city']).to eq("Curitiba")
  end
end
