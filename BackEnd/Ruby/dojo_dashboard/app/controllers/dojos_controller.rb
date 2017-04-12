class DojosController < ApplicationController
  def index
    @dojos = Dojo.all
    @count = Dojo.count
  end

  def new
  end

  def create
    @dojo = Dojo.new(dojo_params)

    if @dojo.save
     redirect_to '/dojos', notice: "You have successfully created a Dojo!"
    else
     flash[:errors] = @dojo.errors.full_messages
     redirect_to '/dojos/new'
    end

  end

  def show
    @dojo = Dojo.find(params[:id])

    @students = @dojo.students
  end

  def edit
    @dojo = Dojo.find(params[:id])
  end

  def update
    dojo = Dojo.find(params[:id])

    dojo.update(dojo_params)

    redirect_to '/dojos'
  end

  def destroy
    dojo = Dojo.find(params[:id])

    dojo.destroy

    redirect_to '/dojos'
  end

  private
  def dojo_params
   params.require(:dojo).permit(:branch, :street, :city, :state)
  end
end
