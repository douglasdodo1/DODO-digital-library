class ChangePublicationDateTypeInArticles < ActiveRecord::Migration[8.0]
  def change
    change_column :articles, :publication_date, :date, using: 'publication_date::date'
  end
end
