class HomeController < ApplicationController
  before_filter :authenticate_user!
  def index
    render json: user_signed_in?
  end
end