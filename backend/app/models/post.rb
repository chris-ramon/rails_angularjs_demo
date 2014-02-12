class Post < ActiveRecord::Base
  validates_presence_of :title, :body
  has_many :comments, as: :commentable
  has_many :uploads, as: :uploadable
  belongs_to :created_by, class_name: 'User'
end
