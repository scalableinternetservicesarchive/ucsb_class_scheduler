class CourseController < ApplicationController
	def all
		@courses = Course.all
		render json: @courses
	end

	def like
		@like = Like.find_or_create_by(user: User.first, course_id: params[:id])
		@like.amount += 1
		@like.save!
		render json: @like
	end
end
