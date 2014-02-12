class AddColumnStatusToUser < ActiveRecord::Migration
  def change
    add_column :users, :status, :integer, null: false, default: 0, limit: 2
  end
end
