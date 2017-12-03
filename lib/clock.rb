require File.expand_path('../../config/boot', __FILE__)

require File.expand_path('../../config/environment', __FILE__)

require 'clockwork'
include Clockwork

handler { |job| Rails.logger.info job }

aggregate_repeat = ENV['AGGREGATE_REPEAT'] ? ENV['AGGREGATE_REPEAT'].to_i.minutes : 1.minute
every(aggregate_repeat, 'AggregateCourses.job') { AggregateCoursesJob.perform_later }
