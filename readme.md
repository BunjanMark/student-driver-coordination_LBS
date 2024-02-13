
# HOPSPOT

  

## Description

  

This project is a comprehensive Mobile Application for Efficient Driver-Passenger Coordination and Location Tracking.

  

## Prerequisites

  

- **Node.js**

- **React Native CLI**

- **ngrok**

- **Websocket server (Socket.io)**

- **Laravel**

- **Composer**

- **Google API key**

//set the application restriction to none

Enable the following APIs and services from google:

 1. Maps SDK for iOS
 2. Places API (New)
 3. Maps SDK for Android
 4. Maps JavaScript API
 5. Geocoding API
 6. Geolocation API
 7. Directions API
 8. Places API
 9. Routes API

  

## Installation

  

1. Clone the repository

2. Navigate to the client project directory: `cd client`

3. Install React Native dependencies: `npm install`

4. Navigate to the server project directory: `cd server`

5. Install Laravel dependencies: `composer install`

6. Create .env file on the root of the server project directory.

7. Copy the configurations below (line 64 to 125) or from .env.example file then paste inside .env

8. Replace the database name (DB_DATABASE) to whatever you have, username (DB_USERNAME) and password (DB_PASSWORD) field that correspond to your configurations.

9. Generate unique APP_KEY in .env file: `php artisan key:generate`

10.  Run `php artisan migrate`

  

## Usage

  

 1. Start backend server from server directory: `php artisan serve --host "YOUR IP-ADDRESS HERE" --port 8000`  (assuming Laravel server is running on port 8000)
 
 2. Start Ngrok tunnel: `ngrok http "YOUR UP ADDRESS HERE"`

 3.  Start the development server from client directory: `npx expo start --tunnel` or `npx expo start`

 4. Run the application on a simulator or device using QR code scan.

 5. Start websocket server (just copy the server.js from client project directory src and paste it inside your websocket server (socket.io) and then start.


  

## Contributing

  

1. Fork the repository

2. Create a new branch: `git checkout -b feature-branch`

3. Make your changes and commit them: `git commit -am 'Add new feature'`

4. Push to the branch: `git push origin feature-branch`

5. Submit a pull request

  

  

## License

This project is currently under further to be develop (2 months since the creation) and all rights are reserved by TechSolve. 

Unauthorized copying, distribution, or use of any part of this project is strictly prohibited without prior written permission from TechSolve. 

Once the project is completed and ready for release, an appropriate license will be chosen and included in the repository.

  


## Contact

For support or to report any issues, please feel free to reach out to us via email at [bunjan.mark476@example.com], [janefaithlabrador06@gmail.com]
or	(mailto:bunjan.mark476@example.com), (mailto:janefaithlabrador06@gmail.com).



  

## Acknowledgements

  

`We extend our sincere appreciation to our project adviser, Sir Jomar & Sir Alex, for their invaluable guidance, support, and mentorship throughout the development of this project. Their expertise and insights have been instrumental in shaping the direction and success of our work.`

  




---------------------------
**.env** file
 
  



    APP_NAME=Laravel
    
    APP_ENV=local
    
    APP_KEY=
    
    APP_DEBUG=true
    
    APP_URL=http://localhost
    
      
    
    LOG_CHANNEL=stack
    
    LOG_DEPRECATIONS_CHANNEL=null
    
    LOG_LEVEL=debug
    
      
    
    DB_CONNECTION=mysql
    
    DB_HOST=127.0.0.1
    
    DB_PORT=3306
    
    DB_DATABASE=
    
    DB_USERNAME=
    
    DB_PASSWORD=
    
      
    
    BROADCAST_DRIVER=log
    
    CACHE_DRIVER=file
    
    FILESYSTEM_DISK=local
    
    QUEUE_CONNECTION=sync
    
    SESSION_DRIVER=file
    
    SESSION_LIFETIME=120
    
      
    
    MEMCACHED_HOST=127.0.0.1
    
      
    
    REDIS_HOST=127.0.0.1
    
    REDIS_PASSWORD=null
    
    REDIS_PORT=6379
    
      
    
    MAIL_MAILER=smtp
    
    MAIL_HOST=mailpit
    
    MAIL_PORT=1025
    
    MAIL_USERNAME=bunjan.mark476@gmail.com
    
    MAIL_PASSWORD=
    
    MAIL_ENCRYPTION=ssl
    
    MAIL_FROM_ADDRESS=bunjan.mark476@gmail.com
    
    MAIL_FROM_NAME=HopSpot
    
      
    
    AWS_ACCESS_KEY_ID=
    
    AWS_SECRET_ACCESS_KEY=
    
    AWS_DEFAULT_REGION=us-east-1
    
    AWS_BUCKET=
    
    AWS_USE_PATH_STYLE_ENDPOINT=false
    
      
    
    PUSHER_APP_ID=
    
    PUSHER_APP_KEY=
    
    PUSHER_APP_SECRET=
    
    PUSHER_HOST=
    
    PUSHER_PORT=443
    
    PUSHER_SCHEME=https
    
    PUSHER_APP_CLUSTER=mt1
    
      
    
    VITE_APP_NAME="${APP_NAME}"
    
    VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
    
    VITE_PUSHER_HOST="${PUSHER_HOST}"
    
    VITE_PUSHER_PORT="${PUSHER_PORT}"
    
    VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
    
    VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

  
