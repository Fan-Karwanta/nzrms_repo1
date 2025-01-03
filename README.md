 
## NZ' RMS

NZ RMS is a Rental Property Management Platform, agency-oriented with an admin dashboard for managing properties, customers and bookings, a frontend and a mobile app for renting properties.

## By
Zxared Jay Mallillin, Nicky Chua Lacsina


## Features

* Agency management
* Ready for one or multiple agencies
* Property management
* Booking management
* Payment management
* Customer management
* Multiple login options (Google, Facebook, Apple, Email)
* Multiple payment methods (GCash Card, Maya Card, Credit Card, PayPal, Google Pay, Apple Pay, Link, Pay Later)
* Operational Stripe Payment Gateway
* Multiple pagination options (Classic pagination with next and previous buttons, infinite scroll)
* Responsive admin dashboard and frontend
* Native Mobile app for Android and iOS with single codebase
* Secure against XSS, XST, CSRF and MITM
* Supported Platforms: iOS, Android, Web, Docker


## Setup
1.) Install IIS Manager in your device.

2.) Browse into "wwwroot" then create these directories: (IF YOU WANT FRESH DATA)

MI_CDN_LOCATIONS=/var/www/cdn/movinin/locations
MI_CDN_TEMP_LOCATIONS=/var/www/cdn/movinin/temp/locations
MI_CDN_USERS=C:\inetpub\wwwroot\cdn\movinin\users
MI_CDN_TEMP_USERS=C:\inetpub\wwwroot\cdn\movinin\temp\users
MI_CDN_PROPERTIES=C:\inetpub\wwwroot\cdn\movinin\properties
MI_CDN_TEMP_PROPERTIES=C:\inetpub\wwwroot\cdn\movinin\temp\properties

--- OR ---

(IF YOU WANT EXISTING DATABASE)
1.) Copy the cdn.zip file here in the repo
2.) Go to IIS manager, go to wwwroot, paste the folder "cdn" with the current files/images.

3.) Make sure your server is running -> you can verify searching "http://localhost/"
  3.1) make sure to also "Edit Permissions" and allow all the IIS manager "cdn" DIR 

4.) Run the api
run in terminal - 
 - cd api
 - (in api dir)
    - npm install (for new installations)
    - after that -> npm run dev
  
5.) Run the Backend ( Agencies & Admin )
 - cd backend
 - (in backend dir)
    - npm install (for new installations)
    - after that -> npm run dev
  

 6.) Run the Frontend / Web App (Clients)
 - cd frontend
 - (in frontend dir)
    - npm install --force (for new installations)
    - after that -> npm run dev

 7.) To run mobile app

 - Prerequisites
 - if you dont have an Expo Account, you need to create one
 - go to ./mobile folder and run the following commands to login to expo.
 - npx expo login
 - Go to expo.dev, Click on Pojects then Create a Project. Set NZ RMS as project name and click on Create.
 - Go to NZ RMS project and copy the project ID. Open ./mobile/app.json and paste the project ID in extra.eas.projectId.

 - in the .env file of ./mobile dir, change the " https:// " with the actual IP, hostname or FQDN of your network. (you can check it if you run "ipconfig" in cmd)
 - note: the api must be running in order for mobile version to be up and running
 - npm install
 - npm start



