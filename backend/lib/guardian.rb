require 'guardian/ensure_magic'

class Guardian
  include EnsureMagic

  def initialize(user)
    @user = user
  end

  def can_create?(klass, parent=nil)
    target = klass.name.underscore
    if parent.present?
      #return false unless can_see?(parent)
      target << "_on_#{parent.class.name.underscore}"
    end
    create_method = :"can_create_#{target}?"

    return send(create_method, parent) if respond_to?(create_method)

    true
  end

  def can_create_post?(klass)
    @user.status == User::STATUS[:active]
  end

  def can_create_upload_on_post?(post)
    post.created_by_id == @user.id
  end
end