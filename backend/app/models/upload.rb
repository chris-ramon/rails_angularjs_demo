class Upload < ActiveRecord::Base
  belongs_to :uploadable, polymorphic: true
  belongs_to :uploaded_by, class_name: 'User'

  def self.set_uploadable(obj, upload_objects)
    ids = []
    upload_objects.each{ |h| ids << h[:id] if h.key?(:id) }
    Upload
      .where(id: ids)
      .update_all(uploadable_id: obj.id,
                  uploadable_type: obj.class.to_s)
  end
end