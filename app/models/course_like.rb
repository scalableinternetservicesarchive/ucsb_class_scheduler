class CourseLike < ApplicationRecord
	belongs_to :course
	belongs_to :user

	validates :amount, inclusion: {
			in: (0..10).to_a,
			message: 'You cannot like a course more than 10 times'
	}
end
