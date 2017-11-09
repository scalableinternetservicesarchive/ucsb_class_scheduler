class Like < ApplicationRecord
	belongs_to :course
	belongs_to :user

	validates_inclusion_of :amount, in: (0..10).to_a,
		message: 'You cannot like a course more than 10 times'
end
