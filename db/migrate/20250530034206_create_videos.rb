class CreateVideos < ActiveRecord::Migration[8.0]
  def change
    create_table :videos do |t|
      t.references :material, null: false, foreign_key: true
      t.string :Video
      t.integer :duration_minutes

      t.timestamps
    end
  end
end
