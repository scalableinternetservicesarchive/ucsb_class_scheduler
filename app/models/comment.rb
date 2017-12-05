class Comment < ApplicationRecord
	belongs_to :parent, class_name: 'Comment', foreign_key: :parent_id, optional: true
	has_many :comment_likes, dependent: :destroy
end
