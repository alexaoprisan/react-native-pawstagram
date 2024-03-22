to do:

Step 1: Setup
Install React Native and Expo CLI.
Create a new project using Expo CLI: expo init Pawstagram.
Navigate to your project directory: cd Pawstagram.

Step 2: Design UI
Design the layout for your app, including the bottom navigation bar with three tabs.
Decide on the color scheme and font styles for your app.

Step 3: Navigation Setup
Install @react-navigation/bottom-tabs for bottom tab navigation: npm install @react-navigation/bottom-tabs.
Create three screens for each tab: Home, Profile, and Create Post.

Step 4: Cloudinary Integration
Sign up for a Cloudinary account.
Install the Cloudinary SDK: npm install cloudinary-react.
Implement image upload functionality using Cloudinary.

Step 5: Database Setup
Design the database schema:
Users table: id, username, password, date of birth, email.
Posts table: id, user_id, caption, timestamp, image URL.
Choose a database solution like Firebase or MongoDB.
Implement database CRUD operations for users and posts.

Step 6: Authentication
Implement user authentication using Firebase Auth or similar.
Create login and registration screens.
Secure routes to ensure only authenticated users can access certain screens.

Step 7: Feed
Fetch posts from the database and display them in the feed.
Sort posts by timestamp, displaying the most recent posts first.
Ensure that only the user's own posts are displayed in their feed.

Step 8: Enhancements
Implement following functionality to show posts from followed users.
Implement accessibility features such as alt text for images.
Integrate location-based features using Mapbox for geolocation and address autocomplete.

Step 9: Testing and Deployment
Test your app thoroughly on various devices and screen sizes.
Address any bugs or issues.
Deploy your app to Expo's servers or to app stores for distribution.
