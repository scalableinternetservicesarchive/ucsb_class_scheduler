load(Rails.root.join( 'db', 'seeds', "dummy_data.rb"))
load(Rails.root.join('db', 'seeds', 'dummy_course_likes_comments.rb')) if ENV["COURSE_LIKES_COMMENTS"]
