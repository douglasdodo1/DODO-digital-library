class CreateMaterials < ActiveRecord::Migration[8.0]
  def change
    create_table :materials do |t|
      t.string :title, null: false
      t.text :description
      t.string :status, null: false
      t.references :author, null: false, foreign_key: true
      t.string :user_cpf, null: false
      t.foreign_key :users, column: :user_cpf, primary_key: :cpf

      t.timestamps
    end
  end
end
