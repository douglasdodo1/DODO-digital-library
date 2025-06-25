# DODO Digital Library

DODO Digital Library is a full-stack web application consisting of a Ruby on Rails  backend and a Next.js (TypeScript) frontend, orchestrated via Docker Compose. It serves as a comprehensive digital library for managing books, articles, and videos, providing user registration, JWT-based authentication, content management, real-time updates, and advanced search capabilities to deliver a seamless experience for both end users and administrators.

---

## 🚀 Technologies Used

**Backend**

* **Ruby** 3.4.3
* **Rails** 8.0.2
* **Database**: PostgreSQL
* **Key Gems**:

  * **puma**: High-performance web server
  * **pg**: PostgreSQL adapter
  * **graphql**: GraphQL API layer
  * **bcrypt**: Secure password hashing
  * **kaminari**: Pagination
  * **jwt**: JSON Web Tokens for authentication
  * **pundit**: Authorization policies
  * **solid\_cache**, **solid\_queue**, **solid\_cable**: Caching, job queueing, ActionCable enhancers
  * **kamal**, **thruster**, **bootsnap**: Performance and deployment optimizations
  * **brakeman**: Security vulnerability scanner
  * **rubocop-rails-omakase**: Code styling and linting

**Frontend**

* **Next.js** 15.3.3 (TypeScript)
* **React** 19.0.0
* **Styling**: Tailwind CSS (v4) + `tw-animate-css`
* **Key Dependencies**:

  * Form handling: `react-hook-form`, `@hookform/resolvers`
  * UI primitives: `@radix-ui/react-dialog`, `@radix-ui/react-label`, `@radix-ui/react-select`, `@radix-ui/react-separator`, `@radix-ui/react-slot`, `@radix-ui/react-tabs`
  * HTTP client: `axios`
  * Icons: `lucide-react`, `react-icons`
  * Utilities: `lodash`, `date-fns`, `class-variance-authority`, `clsx`, `tailwind-merge`, `zod`, `jwt-decode`
  * Linting & Typing: `eslint`, `typescript`, `@types/*`

---

## 💻 Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/douglasdodo1/DODO-digital-library.git
cd DODO-digital-library
```

### 2. Environment Configuration

1. Copy backend config examples:

   ```bash
   cp config/database.yml.example config/database.yml
   cp config/secrets.yml.example config/secrets.yml
   ```
2. Edit `config/database.yml` with your PostgreSQL credentials.
3. Set secure values in `config/secrets.yml` or via environment variables (`SECRET_KEY_BASE`).

### 3. Frontend `.env` Configuration

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```
2. Create a `.env.local` file and define:

   ```dotenv
   NEXT_PUBLIC_API_URL=http://localhost:3000/graphql
   ```
3. (Optional) Add other variables as needed (e.g., auth token expiry).

---

### 4. Build & Run with Docker Compose

```bash
docker-compose up --build -d
```

This command starts three services:

* **web**: Rails backend (port 3000)
* **db**: PostgreSQL database
* **frontend**: Next.js development server (port 4000)

### 5. Start Frontend Dev Server (if needed outside Docker)

```bash
cd frontend
npm install    # or yarn
npm run dev
```

The frontend app will be accessible at `http://localhost:4000` and backend GraphQL API at `http://localhost:3000/graphql`.

---

## 🔌 CORS Configuration

In `config/initializers/cors.rb`, allow requests from the frontend:

```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:4000'
    resource '*', headers: :any, methods: %i[get post put patch delete options head]
  end
end
```

---

## 📝 Directory Structure

```
DODO-digital-library/
├── app/                  # Core application logic
│   ├── controllers/      # HTTP request handlers
│   ├── graphql/          # GraphQL schema, mutations, resolvers, types
│   ├── jobs/             # Background processing (Active Job)
│   ├── mailers/          # Email templates and logic
│   ├── models/           # Database interactions
│   ├── utils/            # Utility modules
│   └── views/            # ERB templates for non-API views
├── bin/                  # Executable scripts
├── config/               # Application configuration + initializers
├── db/                   # Migrations, seeds, schema
├── lib/                  # Custom libraries
├── log/                  # Application logs
├── public/               # Static assets
├── script/               # Helper scripts
├── spec/                 # RSpec test suite
├── storage/              # Active Storage files
├── test/                 # Default Rails tests
├── tmp/                  # Temporary files
├── frontend/             # Next.js + TypeScript frontend
│   ├── components/       # Reusable React components
│   ├── pages/            # Route-based Next.js pages
│   ├── styles/           # Tailwind CSS config
│   ├── public/           # Frontend static assets
│   └── tsconfig.json     # TypeScript config
├── docker-compose.yml    # Docker Compose definitions
└── README.md             # Project overview (this file)
```

---

## ✨ Core Functionalities

1. **User Management**

2. **Author Management**

3. **Material Management**

4. **Background Jobs & WebSockets**

5. **Security & Quality**

6. **Testing**

---

## 👨‍💻 Author

Douglas Gemir
