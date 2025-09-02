#!/bin/bash

# 1. Navigate to your project directory
cd your-project-directory

# 2. Install Firebase
npm install firebase

# 3. Create environment file
touch .env.local

# 4. Install other dependencies if needed
npm install

# 5. Run the development server to test
npm run dev

# 6. In a separate terminal, initialize Firebase database
node scripts/initialize-firebase.js
