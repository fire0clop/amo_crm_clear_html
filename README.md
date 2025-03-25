This is a simple JavaScript application that demonstrates interaction with the AmoCRM API from the frontend without using a backend server. The project showcases authentication, token refreshing, and retrieving deal data from AmoCRM.

2. Development Steps
2.1. Setting Up the Integration
An integration was created and connected in the AmoCRM personal account.

client_id, client_secret, and redirect_uri were obtained for authentication.

Initial access token and refresh token were generated for API interaction.

2.2. Implementing the Token Refresh Script
A JavaScript script was developed to:

Check if the access token is expired.

Use the refresh token to obtain a new access token when needed.

Update the stored tokens, ensuring uninterrupted API access.

This prevents the need for manual reauthentication and improves usability.

2.3. Retrieving Data from AmoCRM
API requests were implemented to fetch deal information from AmoCRM.

Retrieved data is displayed on the webpage in a user-friendly format.

2.4. Handling CORS Restrictions
Since direct requests from the frontend to the AmoCRM API are blocked by CORS policy, the CORS Unlock browser extension is used.

This allows API requests to be sent directly without requiring a backend server.

2.5. Enhancing Visual Presentation
Basic styling was added to improve the display of data.

Simple CSS rules were applied to enhance readability and visual appeal.

3. Project Goal
The project aims to demonstrate a script that:

Automatically refreshes access token and refresh token for AmoCRM API.

Fetches and displays deal data.

Enables API interaction without a backend server.
![image](https://github.com/user-attachments/assets/daf0145a-87f4-4f91-8eab-16f680726e9d)
![image](https://github.com/user-attachments/assets/f2465d0f-4b31-4a2c-bc63-ec3890b96c07)
