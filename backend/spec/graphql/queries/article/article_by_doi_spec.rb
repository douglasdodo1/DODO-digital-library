# spec/graphql/queries/article/article_by_doi_spec.rb
require 'rails_helper'

RSpec.describe 'article_by_doi query', type: :request do
  let!(:author) { create(:author, name: 'Jane Doe') }
  let!(:material) do
    create(:material,
           title: 'Test Article',
           description: 'An article description',
           status: 'publicado',
           author: author)
  end
  let!(:article) do
    create(:article,
           doi: '10.1000/abc123',
           publication_date: Date.parse('2024-01-01'),
           language: 'en',
           material: material)
  end

  let(:query) do
    <<~GQL
      query GetArticleByDoi($doi: String!) {
        articleByDoi(doi: $doi) {
          doi
          publicationDate
          language
          material {
            title
            description
            status
            author {
              name
            }
          }
        }
      }
    GQL
  end

  it 'returns the correct article data for a valid DOI' do
    result = graphql_query(query, variables: { doi: article.doi })

    data = result['data']['articleByDoi']
    expect(data['doi']).to eq(article.doi)
    expect(data['publicationDate']).to eq(article.publication_date.to_s)
    expect(data['language']).to eq(article.language)

    material_data = data['material']
    expect(material_data['title']).to eq(material.title)
    expect(material_data['description']).to eq(material.description)
    expect(material_data['status']).to eq(material.status)
    expect(material_data['author']['name']).to eq(author.name)
  end

  it 'returns null if no article is found with the given DOI' do
    result = graphql_query(query, variables: { doi: 'non-existent-doi' })

    expect(result['data']['articleByDoi']).to be_nil
  end
end
