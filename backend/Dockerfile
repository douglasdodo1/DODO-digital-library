# backend/Dockerfile
FROM ruby:3.3.8-slim

RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev nodejs yarn && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY Gemfile* /app/
RUN bundle install

COPY . /app
EXPOSE 3000

CMD ["bash", "-lc", "bundle exec rails db:migrate && bundle exec puma -C config/puma.rb"]