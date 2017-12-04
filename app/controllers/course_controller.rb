class CourseController < ApplicationController
	before_action :authenticate_user, only: [:like, :comment]

	def preview
		preview_courses_sql = generate_preview_courses_sql(params[:page])

		@courses = Rails.cache.fetch("preview/#{params[:page]}", expires_in: 5.minutes) do
			ActiveRecord::Base.connection.execute(preview_courses_sql).to_a
		end

		render json: @courses
	end

	def filter
		filter_conditions = generate_filter_conditions(params)
		filter_courses_sql = generate_filter_courses_sql(filter_conditions, params[:page])

		@courses = Rails.cache.fetch("filter/#{filter_conditions}/#{params[:page]}", expires_in: 5.minutes) do
			ActiveRecord::Base.connection.execute(filter_courses_sql).to_a
		end

		render json: @courses
	end

	def like
		@like = CourseLike.find_or_create_by(user: current_user, course_id: params[:id])
		@like.amount += 1
		@like.save!
		render json: @like
	rescue ActiveRecord::RecordNotFound, ActiveRecord::InvalidForeignKey, ActiveRecord::RecordInvalid
		render json: { status: 'failed' }, status: 500
	end

	def comment
		course = Course.find(params[:id])
		user = current_user
		@comment = Comment.create!(course_id: course.id, user_id: user.id, content: params[:content])

		render json: @comment
	rescue ActiveRecord::RecordNotFound, ActiveRecord::InvalidForeignKey, ActiveRecord::RecordInvalid
		render json: { status: 'failed' }, status: 500
	end

	def show
		course = Course.find(params[:id])
		render json: course.to_json(include: :comments)
	rescue ActiveRecord::RecordNotFound
		render json: { status: 'failed' }, status: 500
	end

		private

	def generate_filter_conditions(filters)
		filter_conditions = []
		filter_conditions.push("courses.dept='#{params[:dept]}'") unless filters[:dept].nil?
		filter_conditions
	end

	def generate_preview_courses_sql(page = nil)
		offset_sql = "OFFSET #{25 * params[:page].to_i}" unless page.nil?

		<<-SQL
			SELECT courses.*, COALESCE(SUM(course_likes.amount), 0) as likes
			FROM courses
			LEFT JOIN course_likes ON course_likes.course_id = courses.id
			GROUP BY courses.id
			ORDER BY likes DESC
			LIMIT 25
			#{offset_sql};
		SQL
	end

	def generate_filter_courses_sql(filter_conditions, page = nil)
		offset_sql = "OFFSET #{25 * params[:page].to_i}" unless page.nil?

		<<-SQL
			SELECT courses.*, COALESCE(SUM(course_likes.amount), 0) as likes
			FROM courses LEFT JOIN course_likes ON course_likes.course_id = courses.id
			#{'WHERE ' + filter_conditions.join(' AND ') if filter_conditions.present?}
			GROUP BY courses.id
			ORDER BY likes DESC
			LIMIT 25
			#{offset_sql};
		SQL
	end
end
