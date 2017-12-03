class CreateCourseLikesTempTable < ActiveRecord::Migration[5.1]
  def up
    course_likes_temp_sql = <<-SQL
    	CREATE TABLE IF NOT EXISTS course_likes_temp
    	AS (SELECT *, 0 as likes FROM courses);
    SQL

    ActiveRecord::Base.connection.execute(course_likes_temp_sql)
  end

  def down
  	drop_table :course_likes_temp if ActiveRecord::Base.connection.tables.include?(:course_likes_temp)
  end
end
