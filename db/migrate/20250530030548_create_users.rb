class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users, id: false do |t|
      t.string :cpf, null: false, primary_key: true
      t.string :mail
      t.string :password
    end
  end
end
