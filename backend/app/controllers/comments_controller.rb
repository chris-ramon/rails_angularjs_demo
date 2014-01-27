class CommentsController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_action :set_comment, only: [:update]
  def index
    post = Post.where(id: params[:post_id]).first
    if post.present?
      render json: post.comments, only: [:id, :body]
    else
      render json: error_json, status: :not_found
    end
  end

  def create
    params.require('post_id')
    comment = Comment.new(comment_params)
    comment.commentable_id = params['post_id']
    comment.commentable_type = 'Post'
    if comment.save
      render json: comment, status: :created
    else
      render json: comment.errors, status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      render json: @comment, status: :ok
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:body)
  end

  def set_comment
    @comment = Comment.find(params[:id])
  end
end