class CreateArticles < ActiveRecord::Migration[8.0]
  def change
    create_table :articles, id: false do |t|
      t.string :doi, null: false, primary_key: true
      t.references :material, null: false, foreign_key: true
      t.string :publication_date, null: false
      t.string :language, null: false, limit: 2

      t.timestamps
    end
  end
end
