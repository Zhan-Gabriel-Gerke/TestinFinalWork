# Project "Restaurant Booking" (FinalProject)

A simple PHP web application for booking tables in a restaurant.

## Application Access

The application is already deployed and accessible in the cloud at the following URL:
[https://zhan-gabrielgerke24.thkit.ee/php/kaubadKaubagrupid/FinalProject/](https://zhan-gabrielgerke24.thkit.ee/php/kaubadKaubagrupid/FinalProject/)

**No local installation** of PHP, a web server, or a database is required to use the application or run the E2E tests against it.

**Login Credentials:**
* Administrator: `admin` / `admin`
* Regular User (if applicable): `teenindaja` / `teenindaja`

---

## E2E Testing (Playwright)

This project uses Playwright for End-to-End testing **against the deployed cloud version of the application**.

### System Requirements (to run E2E tests)

* **OS:** Windows, macOS, or Linux
* **Runtime:** Node.js v18+
* **Package Manager:** NPM (usually installed with Node.js)
* **Browsers:** Chrome/Chromium (installed automatically by Playwright)

### Step-by-Step Guide to Run E2E Tests on a Clean Computer

1.  **Clone the Repository (if not already done):**
    ```bash
    git clone <URL_of_your_test_repository>
    cd TestinFinalWork
    ```
    *Ensure you are in the directory containing the `package.json` file.*

2.  **Install Node.js Dependencies:**
    Open a terminal in the project directory and run the following command. This will download Playwright and other necessary packages into the `node_modules` folder.
    ```bash
    npm install

    or 
    
    npm.cmd install
    ```

3.  **Install Playwright Browsers:**
    This command downloads the browser binaries (Chromium) that Playwright needs to run the tests.
    ```bash
    npx playwright install

    or 
    
    npx.cmd playwright install
    ```

4.  **Run E2E Tests:**
    Use the following **dedicated command** to execute all E2E tests:
    ```bash
    npm run e2e

    or 

    npm.cmd run e2e
    ```
    * **Note:** Test configurations (application URL, number of parallel workers) are defined in `playwright.config.ts`. To avoid potential issues with Zone.ee hosting's DDoS protection or rate limiting, it's recommended to keep `workers: 1` in the config file. This runs tests sequentially, reducing server load.

5.  **(Optional) Run in UI Mode for Debugging:**
    This command opens a graphical interface for running and analyzing tests step-by-step.
    ```bash
    npm run e2e-ui

    or

    npm.cmd run e2e-ui
    ```

6.  **View Report:**
    After the tests finish, open the HTML report located at `playwright-report/index.html`. Videos and screenshots for failed tests are saved in the `test-results/` directory.

### Example Environment Variable File (`.env.example`)

This file demonstrates which environment variables *could* be used. **No secrets (passwords, API keys) should be added here.** The current test setup does not directly use an `.env` file, but it's provided as an example for potential future needs.

```dotenv
# .env.example

# Base URL for E2E tests (already configured in playwright.config.ts)
# BASE_URL=[https://zhan-gabrielgerke24.thkit.ee/php/kaubadKaubagrupid/FinalProject/](https://zhan-gabrielgerke24.thkit.ee/php/kaubadKaubagrupid/FinalProject/)

# Admin credentials (could be used by tests if moved out of code)
# ADMIN_USER=admin
# ADMIN_PASS=admin_secret_password_from_env

# DB connection details (if tests needed direct DB access)
# DB_HOST=your_db_host
# DB_DATABASE=webfinnal
# DB_USERNAME=your_db_user
# DB_PASSWORD=your_secret_db_password