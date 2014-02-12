require 'spec_helper'
require 'guardian'
require 'guardian/ensure_magic'

describe Guardian do
  describe 'can_create?' do
    describe 'a Post' do
      it 'is true for active user' do
        user = create(:user)
        Guardian.new(user).can_create?(Post).should == true
      end
      it 'is false for inactive user' do
        user = create(:user, status: User::STATUS[:inactive])
        Guardian.new(user).can_create?(Post).should == false
      end
    end
    describe 'a Upload' do
      describe 'on Post' do
        it 'is true when user owns the Post' do
          user = create(:user)
          post = create(:post, created_by: user)
          Guardian.new(user).can_create?(Upload, post).should == true
        end
        it 'is false when user does not own the Post' do
          chris = create(:user)
          roger = create(:user, email: 'roger@gmail.com')
          post = create(:post, created_by: roger)
          Guardian.new(chris).can_create?(Upload, post).should == false
        end
      end
    end
  end
  describe 'EnsureMagic!' do
    it 'calls the correct method and not raises exception' do
      user = create(:user)
      guardian = Guardian.new(user)
      guardian.expects(:can_create?).returns(true)
      lambda { guardian.ensure_can_create!(Post) }.should_not raise_error
    end
    it 'raise exception' do
      user = create(:user)
      guardian = Guardian.new(user)
      guardian.expects(:can_create?).returns(false)
      lambda { guardian.ensure_can_create!(Post) }.should raise_error
    end
  end
end