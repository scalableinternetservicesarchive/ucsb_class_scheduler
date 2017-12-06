class CreateCourseLikesTemps < ActiveRecord::Migration[5.1]
  def change
    create_table :course_likes_temps do |t|

      t.timestamps
    end
  end
end
