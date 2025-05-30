class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users, id: false do |t|
      t.string :cpf, null: false, primary_key: true
      t.string :name, null: false
      t.string :mail, null: false
      t.string :password, null: false
    end
  end
end
