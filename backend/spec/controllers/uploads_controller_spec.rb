require 'spec_helper'

describe UploadsController do
  before do
    @user = create(:user)
    sign_in :user, @user
  end
  describe 'GET #uploads' do
    it 'should response successfully' do
      post = create(:post)
      xhr :get, :index, post_id: post.id
      response.should be_success
    end
    it 'should return collection of uploads' do
      post = create(:post_with_uploads)
      xhr :get, :index, post_id: post.id
      response.should be_success
      parsed = JSON.parse(response.body)
      parsed['files'].length.should == post.uploads.count
    end
  end
end
