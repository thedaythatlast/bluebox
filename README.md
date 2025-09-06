# Bluebox

A web application powered by Angular (frontend) and Node.js + PostgreSQL (backend).

---

## ✅ How to Use the Project

### 📦 Prerequisites

- **Node.js** and **Angular CLI**  
  → [Install Node.js](https://nodejs.org/)  
  → Install Angular CLI:  
  ```bash
  npm install -g @angular/cli
  ```

- **PostgreSQL** (with a local database set up)

---

### ▶️ Running the Frontend (Angular)

1. Download this project as a ZIP and extract it.

2. Open your terminal or CMD and navigate to the frontend folder:
   ```bash
   cd /path/to/bluebox/frontend
   ```

3. Install dependencies:
   ```bash
   npm ci
   ```

4. Start the development server:
   ```bash
   ng serve
   ```

5. Open your browser at:
   ```
   http://localhost:4200/
   ```

---

### 🔧 Running the Backend (Node.js + PostgreSQL)

1. Navigate to the server folder and open the `server.mjs` file:
   ```bash
   cd /path/to/bluebox/server
   ```

2. Edit the PostgreSQL configuration inside `server.mjs`:
   ```js
   const pool = new Pool({
     user: 'postgres',
     host: 'localhost',
     database: 'postgres',
     password: 'your_postgres_password',
     port: 5432,
   });
   ```

3. Install dependencies if needed:
   ```bash
   npm install
   ```

4. Run the server:
   ```bash
   node server.mjs
   ```

---

### ✅ You're Done

With both the frontend and backend running, you can now use the application at:

```
http://localhost:4200/
```

---

## 💡 Tips

- Ensure PostgreSQL is running before starting the backend.
- You may need to allow CORS or modify firewall/database access if using a remote DB.
