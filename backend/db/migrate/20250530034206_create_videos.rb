class CreateVideos < ActiveRecord::Migration[8.0]
  def change
    create_table :videos do |t|
      t.references :material, null: false, foreign_key: true
      t.integer :duration_minutes, null: false

      t.timestamps
    end
  end
end
