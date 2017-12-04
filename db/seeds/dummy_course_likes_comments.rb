Rails.logger.level = :warn

require "set"
require "json"
require "faker"

def create_users(amount)
	unique_emails = Set.new
	while unique_emails.length < amount do
		unique_emails.add(Faker::Internet.email)
	end

	users = unique_emails.to_a.map { |email| "('#{email}', '#{Faker::Lorem.characters(10)}', '#{Time.now}', '#{Time.now}')" }

	users_sql = "INSERT INTO users (email, password_digest, created_at, updated_at) VALUES #{users.join(", ")}"

	ActiveRecord::Base.connection.execute(users_sql)
	return users
end

create_users(10000) if User.count == 0
users = User.select(:id).limit(10000)

like_per = ENV["LIKE_PER"] ? ENV["LIKE_PER"].to_i : 10
comment_per = ENV["COMMENT_PER"] ? ENV["COMMENT_PER"].to_i : 2
course_limit = ENV["COURSE_LIMIT"] ? ENV["COURSE_LIMIT"].to_i : 10000
course_ids = Course.select(:id).limit(10000).map { |course| course.id }

def create_comments(course_limit, comment_per, users, course_ids)
	if Comment.count < course_limit * comment_per / 2
		ActiveRecord::Base.transaction do
			course_ids.each do |course_id|
				comment_partition = []

				comment_per.times do
					content = Faker::Lorem.sentence(4)
					user_id = users.sample.id
					comment_partition.push("('#{content}', '#{user_id}', '#{course_id}', '#{Time.now}', '#{Time.now}')")
				end

				comment_sql = <<-SQL
					INSERT INTO comments
					(content, user_id, course_id, created_at, updated_at)
					VALUES #{comment_partition.join(", ")}
					ON CONFLICT DO NOTHING
				SQL
				ActiveRecord::Base.connection.execute(comment_sql)
			end
		end
	end
end

def create_course_likes(course_limit, like_per, users, course_ids)
	collisions = 0
	if CourseLike.count < course_limit * like_per / 2
		ActiveRecord::Base.transaction do
			course_ids.each do |course_id|
				user_like_amounts = {}

				like_per.times do
					user = users.sample.id

					if user_like_amounts.key?(user)
						if user_like_amounts[user] == 10
							collisions += 1
						end
						user_like_amounts[user] += 1 unless user_like_amounts[user] == 10
					else
						user_like_amounts[user] = 1
					end
				end

				course_likes_partition = []
				user_like_amounts.each do |user_id, amount|
					course_likes_partition.push("('#{amount}', '#{user_id}', '#{course_id}', '#{Time.now}', '#{Time.now}')")
				end

				course_like_sql = <<-SQL
					INSERT INTO course_likes
					(amount, user_id, course_id, created_at, updated_at)
					VALUES #{course_likes_partition.join(", ")}
					ON CONFLICT DO NOTHING
				SQL
				ActiveRecord::Base.connection.execute(course_like_sql)
			end
		end
	end

	p collisions
end

create_comments(course_limit, comment_per, users, course_ids)
create_course_likes(course_limit, like_per, users, course_ids)