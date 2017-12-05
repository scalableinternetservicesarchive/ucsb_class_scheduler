class ScheduleController < ApplicationController
	before_action :authenticate_user

	def index
		render json: Schedule.where(user_id: current_user.id)
	end

	def create
		schedule = create_schedule(current_user, params[:name], params[:periods])
		render json: schedule
	rescue ActiveRecord::RecordInvalid
		render json: { status: 'failed' }, status: 400
	end

	def show
		schedule = Schedule.find(params[:id])

		if schedule.user == current_user
			render json: schedule
		else
			render json: { status: 'invalid' }, status: 400
		end
	rescue ActiveRecord::RecordNotFound
		render json: { status: 'failed' }, status: 400
	end

	def update
		schedule = update_schedule(Schedule.find(params[:id]), params[:periods], params[:name])
		render json: schedule
	rescue ActiveRecord::RecordNotFound, ActiveRecord::RecordInvalid
		render json: { status: 'failed' }, status: 400
	end

	def destroy
		Schedule.where(user_id: current_user.id, id: params[:id]).delete_all

		render json: { status: 'complete' }
	end

		private

	def update_schedule(schedule, period = nil, name = nil)
		schedule.periods = period unless period.nil?
		schedule.name = name unless name.nil?
		schedule.save!
		schedule
	end

	def create_schedule(user, name = nil, periods = nil)
		schedule = Schedule.new(user_id: user.id, name: name, periods: periods)
		schedule.save!
		schedule
	end
end
