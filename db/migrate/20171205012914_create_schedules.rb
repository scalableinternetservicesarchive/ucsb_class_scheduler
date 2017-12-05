class CreateSchedules < ActiveRecord::Migration[5.1]
  def change
    create_table :schedules do |t|
      t.string :name, null: false, default: ''
      t.text :periods, array: true, default: []
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
