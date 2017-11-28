class Comment < ApplicationRecord
	belongs_to :parent, class_name: 'Comment', foreign_key: :parent_id
end
