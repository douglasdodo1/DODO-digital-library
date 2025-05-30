class CreateInstitutions < ActiveRecord::Migration[8.0]
  def change
    create_table :institutions do |t|
      t.references :author, null: false, foreign_key: true
      t.string :city

      t.timestamps
    end
  end
end
