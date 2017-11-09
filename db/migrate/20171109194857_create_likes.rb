class CreateLikes < ActiveRecord::Migration[5.1]
  def change
    create_table :likes do |t|
      t.integer :amount, default: 0, null: false

      t.references 'course', foreign_key: true
      t.references 'user', foreign_key: true

      t.index [:course_id, :user_id], unique: true
      t.timestamps
    end
  end
end
