 
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
Install IIS Manager in your device.

Browse into "wwwroot" then create these directories: (IF YOU WANT FRESH DATA)

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


