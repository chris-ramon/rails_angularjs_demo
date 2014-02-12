class AddColumnUploadableToUploads < ActiveRecord::Migration
  def change
    add_reference :uploads, :uploadable, polymorphic: true
  end
end
