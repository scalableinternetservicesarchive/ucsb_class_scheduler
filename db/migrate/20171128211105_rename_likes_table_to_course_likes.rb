class RenameLikesTableToCourseLikes < ActiveRecord::Migration[5.1]
  def up
  	rename_table :likes, :course_likes
  end
  def down
  	rename_table :course_likes, :likes
  end
end
