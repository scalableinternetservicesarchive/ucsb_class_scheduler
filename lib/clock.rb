require File.expand_path('../../config/boot', __FILE__)

require File.expand_path('../../config/environment', __FILE__)

require 'clockwork'
include Clockwork

handler { |job| Rails.logger.info job }
every(1.minute, 'AggregateCourses.job') { AggregateCoursesJob.perform_later }
