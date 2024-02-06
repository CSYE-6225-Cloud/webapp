CSYE-6225 Assignment 2

# Reference links:

1. https://www.makeuseof.com/nodejs-bcrypt-hash-verify-salt-password/
2. https://www.geeksforgeeks.org/basic-authentication-in-node-js-using-http-header/
3. https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs

# Check Covered:

1. No query params accepted.
2. No Request method except Get accepted for healthz.
3. No request method except Get, Post and Put for user aps
4. No payloads accepted in requests and responses for healthz.
5. Only authorized users can perform Get and Put operations.
6. Allowing only valid JSON schemas for user APIs.
7. Checking if exists or not for user APIs.
8. Checking for correct URLs.
9. Verified the success and failure by shutting down the database server while the application is still running.
10. Restarting the database without restarting the application works.
11. Head and Options are restricted.

# Command to run :

npm start
