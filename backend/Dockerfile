FROM ruby:3.3.8-slim

# 1) atualiza índices e instala todas as libs de uma vez
RUN apt-get update -qq && \
    apt-get install -y \
      build-essential \
      libpq-dev \
      nodejs \
      yarn \
      libyaml-dev \
      zlib1g-dev && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Gemfile* ./
RUN bundle install

COPY . .

EXPOSE 3000

CMD ["bash", "-lc", "bundle exec rails db:migrate && bundle exec puma -C config/puma.rb"]
