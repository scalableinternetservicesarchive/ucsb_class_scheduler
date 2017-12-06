class CourseLikesTemp < ApplicationRecord
	self.table_name = :course_likes_temp
	belongs_to :instructor
	belongs_to :course
	belongs_to :user
end
