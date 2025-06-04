# DODO Digital Library

DODO Digital Library is a web application built with Ruby on Rails 8.0.2, designed to function as a comprehensive digital library for managing books, videos, and articles. It provides robust features for registration, search, and content management, ensuring a streamlined experience for users.

---

<<<<<<< HEAD
## 🚀 Technologies Used

This project leverages a modern and powerful stack:

- **Ruby**: 3.4.3
- **Rails**: 8.0.2
- **Database**: PostgreSQL
- **Key Gems**:
  - `puma`: High-performance web server.
  - `pg`: PostgreSQL database adapter.
  - `graphql`: For building powerful APIs.
  - `bcrypt`: Secure password hashing.
  - `kaminari`: Pagination.
  - `jwt`: JSON Web Token for authentication.
  - `pundit`: Authorization policies.
- **Testing**:
  - `rspec-rails`: Behavior-driven development framework.
  - `factory_bot_rails`: Test data generation.
  - `faker`: Realistic dummy data.
  - `shoulda-matchers`: RSpec matchers for common Rails functionality.
- **Security & Quality**:
  - `brakeman`: Static analysis security vulnerability scanner.
  - `rubocop-rails-omakase`: Code style guide and formatter.
- **Other**: `solid_cache`, `solid_queue`, `solid_cable`, `kamal`, `thruster`, `bootsnap` for enhanced performance and deployment.

---

## 💻 Installation and Configuration

To get the DODO Digital Library up and running on your local machine, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/douglasdodo1/DODO-digital-library.git](https://github.com/douglasdodo1/DODO-digital-library.git)
=======
1.  Clonar o repositório
    git clone https://github.com/douglasdodo1/DODO-digital-library.git
>>>>>>> 192d1b4fb04486e108640189272df04461de8cee
    cd dodo-digital-library
    ```

2.  **Install dependencies:**

    ```bash
    bundle install
    ```

3.  **Configure the database:**
    Copy and configure `config/database.yml`. Ensure you replace the placeholder values with your actual PostgreSQL credentials.

    ```yaml
    # config/database.yml example
    default: &default
      adapter: postgresql
      encoding: unicode
      host: hostexample # Replace with your PostgreSQL host (e.g., localhost)
      username: usernameexample # Replace with your PostgreSQL username
      password: passwordexample # Replace with your PostgreSQL password
      pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

    development:
      <<: *default
      database: example_library_db_development

    test:
      <<: *default
      database: example_library_db_test

    production:
      <<: *default
      database: example_db_production
      username: usernameexample
      password: <%= ENV['DATABASE_PASSWORD'] %>
    ```

4.  **Create secrets file:**
    Create `config/secrets.yml` and set your secret keys. **Crucially, for production, use a strong, randomly generated key and store it securely in an environment variable.**

    ```yaml
    # config/secrets.yml
    development:
      secret_key_base: sua_chave_secreta_dev # Replace with a secure, random string for development
    test:
      secret_key_base: sua_chave_secreta_test # Replace with a secure, random string for test
    production:
      secret_key_base: <%= ENV["SECRET_KEY_BASE"] %> # Must be set via environment variable in production
    ```

5.  **Create and migrate the database:**
    ```bash
    rails db:create db:migrate
    ```

---

## 🔒 Authentication

Users authenticate via email and password, with authentication handled securely using JSON Web Tokens (JWT). This ensures stateless and secure communication.

---

## 📂 Directory Structure (Overview)

The project follows a standard Rails directory structure, with some key additions for GraphQL:

- `.kamal/`: Deployment configurations.
- `.ruby-lsp/`: Ruby Language Server Protocol configurations.
- `app/`: Core application logic.
  - `controllers/`: Handles HTTP requests.
  - `graphql/`: GraphQL schema definitions.
    - `mutations/`: Defines operations that modify data.
    - `resolvers/`: Logic for fetching data.
    - `types/`: Defines data types.
  - `jobs/`: Background processing.
  - `mailers/`: Email sending.
  - `models/`: Database interactions.
  - `utils/`: Utility functions.
  - `views/`: User interface templates.
- `bin/`: Executable scripts.
- `config/`: Application configurations.
- `db/`: Database schema and migrations.
- `lib/`: Library modules.
- `log/`: Application logs.
- `public/`: Static assets.
- `script/`: Helper scripts.
- `spec/`: RSpec tests.
- `storage/`: Active Storage files.
- `test/`: Rails default tests (though RSpec is primary).
- `tmp/`: Temporary files.

---

## ✨ Core Functionalities

The DODO Digital Library offers the following key features:

- **User Management**: Users can create, edit, and delete their own accounts.
- **Author Management**: Comprehensive CRUD (Create, Read, Update, Delete) operations for authors, supporting both individual (person) and institutional types.
- **Material Management**: Full CRUD operations for various material types:
  - **Books**: With ISBN and page numbers.
  - **Articles**: Including DOI, publication date, and language.
  - **Videos**: With duration in minutes.
  - All materials are associated with an author.
- **Advanced Search**: Paginates search results and allows filtering materials by title, author name, and description using partial full-text search.

---

## 🗄️ Database Structure (Main Tables)

Here's an overview of the most relevant tables in the database:

| Tabela         | Primary Key     | Relevant Fields                                           |
| :------------- | :-------------- | :-------------------------------------------------------- |
| `users`        | `cpf` (string)  | `name`, `mail`, `password_digest`                         |
| `authors`      | `id` (bigint)   | `name`                                                    |
| `materials`    | `id` (bigint)   | `title`, `description`, `status`, `author_id`, `user_cpf` |
| `books`        | `isbn` (string) | `material_id`, `page_numbers`                             |
| `articles`     | `doi` (string)  | `material_id`, `publication_date`, `language`             |
| `videos`       | `id` (bigint)   | `material_id`, `duration_minutes`                         |
| `people`       | `id` (bigint)   | `author_id`, `birth_date`                                 |
| `institutions` | `id` (bigint)   | `author_id`, `city`                                       |

---

## ✅ Business Rules Implemented

The application adheres to the following business logic to ensure data integrity and proper user interaction:

- Users can only create authors of type **person** or **institution**, and materials must be linked to these authors.
- All materials (books, articles, videos) are always associated with a single author.
- An authenticated user can only manage (create, edit, delete) materials they have personally registered, enforced by the user's CPF linked to the material.
- Material search is performed with **pagination** and allows filtering by title, author's name, or description using partial full-text search.
- Only **authenticated users** can perform creation, editing, and deletion operations.
- User authentication data is secured with **bcrypt password encryption**.
- Access control to operations is managed via **JWT** and **Pundit policies**, authorizing user actions.
- Users are restricted to editing and deleting only their own data and associated materials.
- The system supports **multiple author types** (person or institution) for flexible cataloging.

---

## 🧪 Running Tests

Before running the tests, please adjust the test CPF in `spec/support/test_constants.rb` to a **real, valid CPF**:

````ruby
# spec/support/test_constants.rb
CPF_TEST = "YOUR_VALID_CPF_HERE"
Then, execute the tests with:

Bash

bundle exec rspec
🌐 API Documentation
Detailed examples of API usage can be found in the interactive Postman documentation:

https://www.postman.com/science-architect-36844716/workspace/my-workspace/collection/27817712-a27a9c2e-31ba-4739-931a-0d40100f3b39?action=share&amp;creator=27817712

📝 Observations
This project does not utilize Docker for containerization.
There is no public deployment configured by default.
PostgreSQL must be running locally for the application to function.
The codebase is based on the latest stable version of Rails (8.0.2) and Ruby (3.4.3).
👨‍💻 Author
Douglas Gemir

Feel free to reach out if you have any questions!

