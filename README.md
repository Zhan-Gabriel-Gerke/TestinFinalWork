# Project "Restaurant Booking" (FinalProject)

A simple PHP web application for booking tables in a restaurant. It allows users to view the menu and book tables. Administrators can manage bookings and the menu.

## System Requirements (Application)

* **OS:** Windows, macOS, or Linux
* **Runtime:** PHP 7.4+ (based on the code, but PHP 8.0+ recommended)
* **Web Server:** Apache or Nginx (with PHP-FPM configured)
* **Database:** MySQL 5.7+ or MariaDB 10.2+
* **Browser:** Modern browser (Chrome, Firefox, Edge, Safari)

## Running the Application (Locally - for Development/Setup)

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd FinalProject
    ```

2.  **Configure Web Server:**
    * Use XAMPP, WAMP, MAMP, or a similar stack.
    * Set the DocumentRoot of your virtual host to the `FinalProject` folder (e.g., `C:/xampp/htdocs/FinalProject` or `/var/www/html/FinalProject`).

3.  **Set up the Database:**
    * Create a MySQL/MariaDB database (e.g., named `webfinnal`).
    * Import the table structure and initial data from the provided `.sql` file (You need to create and add this file, e.g., `database.sql`, to the repository).
    * **Example command line import:**
        ```bash
        mysql -u <db_username> -p <database_name> < database.sql
        ```

4.  **Configure DB Connection:**
    * Edit the `SRVconf.php` file with your local database credentials:
        ```php
        <?php
        $kasutaja = "your_db_user"; // e.g., "root"
        $parool = "your_db_password"; // Often empty for local XAMPP
        $andmebaas = "webfinnal"; // Your database name
        $serverinimi = "localhost"; // or "127.0.0.1"
        
        $yhendus = new mysqli($serverinimi, $kasutaja, $parool, $andmebaas);
        $yhendus->set_charset( "utf8");
        // Add connection check (optional but helpful)
        if ($yhendus->connect_error) {
           die("Connection failed: " . $yhendus->connect_error);
        }
        ?>
        ```
    * **IMPORTANT:** Do not commit real passwords to Git! Use this for local setup only. For Zone.ee, you'll have a different configuration file or method (like environment variables if the code is adapted).

5.  **Open in Browser:**
    * Navigate to the URL configured in step 2. Usually `http://localhost/FinalProject/` or `http://localhost/`. The main page is `index.php`.

6.  **Login Credentials:**
    * Administrator: `admin` / `admin`
    * Regular User (if applicable): `teenindaja` / `teenindaja` (Note: `login2.php` uses `password_verify`, so passwords must be hashed correctly in the database).

## E2E Testing (Playwright)

This project uses Playwright for End-to-End testing against the **live cloud instance**.

### System Requirements for Tests

* Node.js v18+
* NPM (usually comes with Node.js)
* Browsers (installed automatically by Playwright)

### Running E2E Tests (First Time)

1.  Ensure the application is running and accessible at the cloud URL specified in `playwright.config.ts` (`baseURL`):
    `https://zhan-gabrielgerke24.thkit.ee/php/kaubadKaubagrupid/FinalProject/`
2.  Open a terminal in the `FinalProject` folder (where `package.json` is located).
3.  Install Node.js dependencies:
    ```bash
    npm install
    ```
4.  Install Playwright browsers:
    ```bash
    npx playwright install
    ```

### Running E2E Tests (Standard)

1.  To run all tests in the console:
    ```bash
    npm run e2e
    ```
    * **Note:** If tests fail with timeouts on the Zone.ee hosting, try setting `workers: 1` in `playwright.config.ts` to run tests sequentially instead of in parallel. This reduces server load.

2.  To run tests in the interactive UI mode (useful for debugging):
    ```bash
    npm run e2e-ui
    ```
3.  After the run, the HTML report will be available at `playwright-report/index.html`. Videos and screenshots for failed tests are saved in the `test-results/` folder.

### `.env.example` File (Example for Environment Variables)

While the current PHP code doesn't use `.env` files, this is a good practice for storing secrets if tests or future application versions need API keys or other sensitive data outside the codebase.

```dotenv
# Base URL for E2E tests (already configured in playwright.config.ts)
# BASE_URL=[https://zhan-gabrielgerke24.thkit.ee/php/kaubadKaubagrupid/FinalProject/](https://zhan-gabrielgerke24.thkit.ee/php/kaubadKaubagrupid/FinalProject/)

# Admin credentials (could be used by tests if needed)
# ADMIN_USER=admin
# ADMIN_PASS=admin

# DB connection details (if moved out of SRVconf.php)
# DB_HOST=localhost
# DB_DATABASE=webfinnal
# DB_USERNAME=root
# DB_PASSWORD=