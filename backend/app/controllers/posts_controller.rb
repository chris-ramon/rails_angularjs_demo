class PostsController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_action :set_post, only: [:edit, :update, :destroy]
  before_filter :authenticate_user!

  # GET /posts
  # GET /posts.json
  def index
    @posts = Post.all.page params[:page]
    render json: @posts, status: :ok
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
      post = Post.where(id:params[:id]).first
      if post.present?
        render json: post, status: :ok
      else
        render json: error_json, status:  :not_found
    end
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
  end

  # POST /posts
  # POST /posts.json
  def create
    @post = Post.new(post_params)
    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    if @post.update(post_params)
      render json: success_json, status: :ok
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post.destroy
    render json: success_json, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:title, :body)
    end
end
