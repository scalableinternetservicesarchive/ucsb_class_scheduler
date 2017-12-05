class User < ApplicationRecord
	has_secure_password
	has_many :periods, dependent: :destroy
	has_many :comments, dependent: :destroy
	has_many :schedules, dependent: :destroy

	validates :password, presence: true, length: { minimum: 6 }
	validates :email, email: true
end
