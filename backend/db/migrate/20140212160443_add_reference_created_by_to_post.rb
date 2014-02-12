class AddReferenceCreatedByToPost < ActiveRecord::Migration
  def change
    add_column :posts, :created_by_id, :integer, null: false, default: 0
  end
end
