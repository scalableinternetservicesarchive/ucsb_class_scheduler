class CourseController < ApplicationController
	def all
		find_courses_sql = <<-SQL
			SELECT courses.*, COALESCE(SUM(likes.amount), 0) as likes
			FROM courses LEFT JOIN likes ON likes.course_id = courses.id
			GROUP BY courses.id;
		SQL

		@courses = ActiveRecord::Base.connection.execute(find_courses_sql)
		render json: @courses
	end

	def like
		@like = Like.find_or_create_by(user: User.first, course_id: params[:id])
		@like.amount += 1
		@like.save!
		render json: @like
	end

	def comment
		course = Course.find(params[:id])
		user = User.first # hardcode user for now
		@comment = Comment.create!(course_id: course.id, user_id: user.id, content: params[:content])

		render json: @comment

	rescue ActiveRecord::RecordNotFound
		render json: { status: "failed" }
	end
end
