class StudentsController < ApplicationController
  def show
    # @student = Dojo.joins(:students).select(“*”)
    @student = Student.find(params[:id])
    @students = Student.all
    # @dojo = Dojo.includes(:students)
    @dojo = Dojo.find(params[:dojo_id])

    @cohort = Dojo.find(params[:dojo_id]).students

  end

  def edit
    @student = Student.find(params[:id])
    @dojo = Dojo.find(params[:dojo_id])
    @dojos = Dojo.all
    # render json: @student
  end

  def update
    @student = Student.find(params[:id])

    @student.update(student_params)

    redirect_to "/dojos/#{@student.dojo_id}/students/#{@student.id}"
  end

  def new
    @dojos = Dojo.all
    @dojo = Dojo.find(params[:dojo_id])
  end

  def create
    @student = Student.new(student_params)

    if @student.save
      redirect_to "/dojos/#{@student.dojo_id}", notice: "You have successfully created a Student!"
    else
      flash[:errors] = @student.errors.full_messages
      redirect_to :back
    end
  end

  def destroy
    student = Student.find(params[:id])

    student.destroy

    redirect_to '/dojos'
  end

  private
    def student_params
      params.require(:student).permit(:first_name, :last_name, :email, :dojo_id)
    end
end
