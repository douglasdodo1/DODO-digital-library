require "net/http"
require "json"

module OpenLibrary
  class FetchAuthorData
    def self.call(author_key)
      return nil if author_key.blank?

      uri = URI("https://openlibrary.org#{author_key}.json")
      response = Net::HTTP.get_response(uri)
      return nil unless response.is_a?(Net::HTTPSuccess)

      JSON.parse(response.body)
    rescue StandardError => e
      Rails.logger.error("Erro ao buscar autor da OpenLibrary: #{e.message}")
      nil
    end
  end
end
