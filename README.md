1. Cover the code with unit tests using Mocha and Chai for folder /utils.
2. Configure reporter.
3. Add code coverage analysis using c8.
4. Ensure 80% (or more) code coverage with tests for folder /utils.
5. Add the following scripts to package.json:
   test — to run tests and generate an html report.
   coverage — to analyze code coverage.
6. Set up a linter (ESLint), configure Babel, set up pre-commit hooks, work with the GitLab CI/CD pipeline, and identify and fix errors in the code. 
   6.1. Setup eslint (using eslint init) with a style guide.  (eslint.config.js)
   6.2. Setup Babel. (babel.config.js)
   6.3. Setup husky. Add pre-commit hooks to the package.json:
7. Create github pipeline with the following stages:
   test — runs tests and generates an html report.
   coverage — runs code coverage analysis.
   lint — runs linter to check code in js files.

---

Files eslint.config.js, babel.config.js, .gitlab-ci.yml download here
Attach link to the branch repository with your Practice task. Do not forgot grant appropriate access rights to your lecturer

---

Acceptance Criteria
1. Code Coverage: All functions from the provided files must be more 80% covered by unit tests. This includes:
   - Checking for correct values.
   - Checking for edge cases.
   - Checking for errors (e.g. calling with incorrect arguments).
2. Scripts in package.json:
   - test — runs tests using Mocha (or another framework) and generates an html report.
   - coverage — runs code coverage analysis using c8.
   - eslint - runs linter to check code in js files.
3. The project is correctly initialized.
4. Babel is configured and works.
5. ESLint is configured and detects errors.
6. Pre-commit hook prevents commit with errors.
