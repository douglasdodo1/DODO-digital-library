class RemovePublicationDateFromArticles < ActiveRecord::Migration[8.0]
  def change
    remove_column :articles, :publication_date, :date
  end
end
