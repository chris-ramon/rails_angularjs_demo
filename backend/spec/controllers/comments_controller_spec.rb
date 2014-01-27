require 'spec_helper'

describe CommentsController do
  describe "GET #index" do
    it "responds successfully with an HTTP 200 status code" do
      post = create(:post_with_comments)
      xhr :get, :index, post_id: post.id
      response.should be_success
      parsed = JSON.parse(response.body)
      parsed.length.should == post.comments.count
    end
    it 'should return error json when post id not exist' do
      xhr :get, :index, post_id: 1990
      response.should_not be_success
    end
  end
  describe "POST #create" do
    it 'should create a new comment' do
      post = create(:post)
      xhr :post, :create, post_id: post.id, comment: {body: 'hi there'}
      response.should be_success
      post.comments.count.should == 1
    end
    it 'should no create a comment when parameters are missing' do
      xhr :post, :create, post_id: '', comment: {body: 'some content'}
      response.should_not be_success
    end
  end
end