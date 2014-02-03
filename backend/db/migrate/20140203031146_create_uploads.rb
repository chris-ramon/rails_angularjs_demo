class CreateUploads < ActiveRecord::Migration
  def change
    create_table :uploads do |t|
      t.string :sha1, limit: 40
      t.string  :original_filename, null: false
      t.integer :filesize, null: false
      t.integer :width, null: true
      t.integer :height, null: true
      t.string  :url, null: false
      t.timestamps
    end
  end
end
