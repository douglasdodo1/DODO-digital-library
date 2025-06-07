require 'rails_helper'

RSpec.describe 'video_by_id query', type: :request do
  let!(:author) { create(:author, name: 'Video Author') }
  let!(:material) { create(:material, title: 'Test Video', author: author) }
  let!(:video) { create(:video, duration_minutes: 300, material: material) }

  let(:query) do
    <<~GRAPHQL
      query GetVideoById($id: ID!) {
        videoById(id: $id) {
          id
          durationMinutes
          material {
            title
            author {
              name
            }
          }
        }
      }
    GRAPHQL
  end

  it 'returns the correct video data' do
    result = graphql_query(query, variables: { id: video.id })

    expect(result['errors']).to be_nil

    data = result['data']['videoById']
    expect(data).not_to be_nil
    expect(data['id']).to eq(video.id.to_s)
    expect(data['durationMinutes']).to eq(300)
    expect(data['material']['title']).to eq('Test Video')
    expect(data['material']['author']['name']).to eq('Video Author')
  end

  it 'returns null if video is not found' do
    result = graphql_query(query, variables: { id: '99999' })

    expect(result['errors']).to be_nil
    expect(result['data']['videoById']).to be_nil
  end
end
