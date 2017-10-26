FROM ruby:2.4.0
LABEL maintainer="haavard.ae@gmail.com"

ENV APP_ROOT /app
ENV BUNDLE_PATH /bundle

RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev nodejs

COPY Gemfile* /app/
WORKDIR /app

RUN bundle install

CMD ["rails", "s"]
