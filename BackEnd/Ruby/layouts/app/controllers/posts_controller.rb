class PostsController < ApplicationController
  def index
    @posts = Post.includes(:user)
    @users = User.all
    render layout: "three_column"
  end



  def new
  end

  def create
    @post = Post.new(posts_params)

    if @post.save
      redirect_to posts_path
    else
      flash[:errors] = @post.errors.full_messages
      redirect_to :back
    end
  end

  private
    def posts_params
      params.require(:post).permit(:title, :content, :user_id)
    end
end
