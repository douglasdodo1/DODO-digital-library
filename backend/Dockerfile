FROM ruby:3.3.8-slim

RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev nodejs yarn  && \
    apt-get install -y libyaml-dev && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY . .

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
