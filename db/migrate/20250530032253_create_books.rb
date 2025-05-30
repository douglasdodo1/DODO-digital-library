class CreateBooks < ActiveRecord::Migration[8.0]
  def change
    create_table :books, id: false do |t|
      t.string :isbn, null: false, primary_key: true
      t.string :p
      t.references :material, null: false, foreign_key: true
      t.integer :age_numbers

      t.timestamps
    end
  end
end
