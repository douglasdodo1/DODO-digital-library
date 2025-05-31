class CreateBooks < ActiveRecord::Migration[8.0]
  def change
    create_table :books, id: false do |t|
      t.string :isbn, null: false, primary_key: true
      t.references :material, null: false, foreign_key: true
      t.integer :page_numbers, null: false

      t.timestamps
    end
  end
end
