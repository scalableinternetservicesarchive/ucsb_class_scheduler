class Course < ApplicationRecord
	belongs_to :instructor
	has_many :likes, dependent: :delete_all
end
