# Eagle Entertainment - Deployment Guide

This document outlines the steps to deploy the Eagle Entertainment platform to a production environment.

## 1. Backend Configuration

The backend is configured to use environment variables for sensitive settings.

### Environment Variables Required:
- `SPRING_PROFILES_ACTIVE`: Set to `prod`.
- `DB_URL`: JDBC URL for your database.
  - For MySQL: `jdbc:mysql://your-db-host:3306/eagle_entertainment`
  - For Supabase: `jdbc:postgresql://db.[PROJECT-ID].supabase.co:5432/postgres`
- `DB_DRIVER`: (Optional) 
  - `com.mysql.cj.jdbc.Driver` (Default)
  - `org.postgresql.Driver` (For Supabase)
- `DB_DIALECT`: (Optional)
  - `org.hibernate.dialect.MySQLDialect` (Default)
  - `org.hibernate.dialect.PostgreSQLDialect` (For Supabase)
- `DB_USER`: Database username.
- `DB_PASSWORD`: Database password.
- `JWT_SECRET`: A long, secure random string for JWT signing.
- `ALLOWED_ORIGINS`: Comma-separated list of allowed frontend URLs (e.g., `https://your-frontend.com`).
- `PORT`: The port the server should listen on (defaults to `8080`).

### Database Setup:
The application uses `spring.jpa.hibernate.ddl-auto=update`, which will create the necessary tables automatically on the first run.
To seed the database with initial data, you can run the SQL commands found in `backend/src/main/resources/data-mysql.sql`. This file is pre-configured for MySQL syntax.

## 2. Frontend Configuration

The frontend uses `REACT_APP_API_URL` to point to the backend.

### Build Step:
When building the frontend, ensure the environment variable is set:
```bash
REACT_APP_API_URL=https://your-backend-api.com npm run build
```

## 3. Containerized Deployment (Recommended)

Both frontend and backend include `Dockerfile`s. You can use the provided `docker-compose.yml` to test the entire stack locally in production mode:

```bash
docker-compose up --build
```

## 4. Cloud Deployment (e.g., Cloud Run / AWS ECS)

1.  **Backend:**
    - Build the image using `backend/Dockerfile`.
    - Push to your container registry.
    - Deploy as a service, providing the environment variables listed above.
2.  **Frontend:**
    - Build the image using `frontend/Dockerfile`.
    - Note: The `REACT_APP_API_URL` must be baked into the image during the build stage.
    - Push and deploy.

## 5. Security Checklist
- [ ] Change the `JWT_SECRET` to a unique, secure value.
- [ ] Ensure the database is not publicly accessible.
- [ ] Use HTTPS for both frontend and backend.
- [ ] Update `ALLOWED_ORIGINS` to only include your production domain.
