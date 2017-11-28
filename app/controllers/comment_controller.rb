class CommentController < ApplicationController
	def like
		@like = CommentLike.find_or_create_by(user: current_user, comment_id: params[:id])
		@like.amount += 1
		@like.save!
		render json: @like
	rescue ActiveRecord::RecordNotFound, ActiveRecord::InvalidForeignKey, ActiveRecord::RecordInvalid
		render json: { status: 'failed' }, status: 500
	end

	def reply
		comment = Comment.find(params[:id])
		parent_id = params[:id]

		user = current_user
		@comment = Comment.create!(course_id: comment.course_id, user_id: user.id, content: params[:content], parent_id: parent_id)

		render json: @comment
	rescue ActiveRecord::RecordNotFound, ActiveRecord::InvalidForeignKey, ActiveRecord::RecordInvalid
		render json: { status: 'failed' }, status: 500
	end
end
