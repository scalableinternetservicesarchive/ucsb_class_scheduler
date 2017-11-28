class CreateCommentLikes < ActiveRecord::Migration[5.1]
  def change
    create_table :comment_likes do |t|
		t.integer :amount, default: 0, null: false

		t.references :comment, foreign_key: true
		t.references :user, foreign_key: true

		t.index [:comment_id, :user_id], unique: true
    	t.timestamps
    end
  end
end
