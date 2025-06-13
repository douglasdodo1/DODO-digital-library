class AddPublicationDateAndCategoryToMaterials < ActiveRecord::Migration[8.0]
  def change
    add_column :materials, :publication_date, :date
    add_column :materials, :category, :string
  end
end
