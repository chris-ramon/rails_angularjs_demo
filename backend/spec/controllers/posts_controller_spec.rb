require 'spec_helper'

describe PostsController do
  describe 'GET #index' do
    it 'should responds 200' do
      3.times { create(:post) }
      xhr :get, :index
      response.should be_success
      parsed = JSON.parse(response.body)
      parsed.length.should == 3
    end
  end

  describe 'POST #new' do
    it 'should create a post' do
      xhr :post, :create, post: {title: 'cool title', body: 'body post'}
      response.should be_success
      Post.count.should == 1
    end
    it 'should return validation errors' do
      xhr :post, :create, post: {body: 'body post'}
      response.should_not be_success
    end
  end

  describe 'UPDATE #update' do
    it 'should update one post' do
      post = create(:post)
      xhr :put, :update, id:post.id, post: {title: 'title updated!'}
      response.should be_success
      post_updated = Post.where(id=post.id).first
      post_updated.title.should == 'title updated!'
    end
  end

  describe 'DELETE #delete' do
    it 'should delete one post' do
      post = create(:post)
      xhr :delete, :destroy, id: post.id
      response.should be_success
      post_deleted = Post.where(id=post.id).first
      post_deleted.should == nil
    end
  end

end