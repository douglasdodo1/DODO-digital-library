module Types
  module Book
    class DeleteBookInput < Types::BaseInputObject
      description "Input para deletar um livro pelo ISBN."

      argument :isbn, String, required: true, description: "ISBN do livro a ser deletado."
    end
  end
end
