require "net/http"
require "json"

module OpenLibrary
  class FetchBookData
    def self.call(isbn)
      book_uri = URI("https://openlibrary.org/isbn/#{isbn}.json")
      book_res = Net::HTTP.get_response(book_uri)
      return nil unless book_res.is_a?(Net::HTTPSuccess)

      book_data = JSON.parse(book_res.body)

      author_key = book_data["authors"]&.first&.dig("key")
      if author_key
        author_uri = URI("https://openlibrary.org#{author_key}.json")
        author_res = Net::HTTP.get_response(author_uri)
        if author_res.is_a?(Net::HTTPSuccess)
          author_data = JSON.parse(author_res.body)
          book_data["author_name"] = author_data["name"]
          book_data["author_bio"] = author_data["bio"]
        end
      end

      book_data
    end
  end
end
