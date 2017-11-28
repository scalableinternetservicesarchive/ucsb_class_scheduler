class CommentController < ApplicationController
	def like
		@like = CommentLike.find_or_create_by(user: current_user, comment_id: params[:id])
		@like.amount += 1
		@like.save!
		render json: @like

	rescue ActiveRecord::RecordNotFound
	rescue ActiveRecord::InvalidForeignKey
	rescue ActiveRecord::RecordInvalid
		render json: { status: 'failed' }, status: 500
	end
end
