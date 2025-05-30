class CreatePeople < ActiveRecord::Migration[8.0]
  def change
    create_table :people do |t|
      t.references :author, null: false, foreign_key: true
      t.date :birth_date

      t.timestamps
    end
  end
end
