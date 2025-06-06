# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_06_03_023706) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "articles", primary_key: "doi", id: :string, force: :cascade do |t|
    t.bigint "material_id", null: false
    t.date "publication_date", null: false
    t.string "language", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["material_id"], name: "index_articles_on_material_id"
  end

  create_table "authors", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "books", primary_key: "isbn", id: :string, force: :cascade do |t|
    t.bigint "material_id", null: false
    t.integer "page_numbers", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["material_id"], name: "index_books_on_material_id"
  end

  create_table "institutions", force: :cascade do |t|
    t.bigint "author_id", null: false
    t.string "city", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_institutions_on_author_id"
  end

  create_table "materials", force: :cascade do |t|
    t.string "title", null: false
    t.text "description"
    t.string "status", null: false
    t.bigint "author_id", null: false
    t.string "user_cpf", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_materials_on_author_id"
  end

  create_table "people", force: :cascade do |t|
    t.bigint "author_id", null: false
    t.date "birth_date", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_people_on_author_id"
  end

  create_table "users", primary_key: "cpf", id: :string, force: :cascade do |t|
    t.string "name", null: false
    t.string "mail", null: false
    t.string "password_digest"
  end

  create_table "videos", force: :cascade do |t|
    t.bigint "material_id", null: false
    t.integer "duration_minutes", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["material_id"], name: "index_videos_on_material_id"
  end

  add_foreign_key "articles", "materials"
  add_foreign_key "books", "materials"
  add_foreign_key "institutions", "authors"
  add_foreign_key "materials", "authors"
  add_foreign_key "materials", "users", column: "user_cpf", primary_key: "cpf"
  add_foreign_key "people", "authors"
  add_foreign_key "videos", "materials"
end
