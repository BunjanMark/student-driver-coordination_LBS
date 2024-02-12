# HOPSPOT

## Description
This project is a comprehensive Mobile Application for Efficient Driver-Passenger Coordination and Location Tracking.


## Prerequisites
- Node.js
- React Native CLI
- ngrok
- Websocket server (Socket.io)
- Laravel
- Composer
- Google API key
     //set the application restriction to none
     //enable the following APIs and services from google: 
Maps SDK for iOS
Places API (New)
Maps SDK for Android
Maps JavaScript API
Geocoding API
Geolocation API
Directions API
Places API
Routes API

## Installation   (inside backticks are terminal commands)
1. Clone the repository
2. Navigate to the client project directory: `cd client`
3. Install React Native dependencies: `npm install`
4. Navigate to the server project directory: 'cd server' 
5. Install Laravel dependencies: `composer install`
6. Create .env file on the root of the server project directory.
7. Copy the configurations below (line 64 to 125) or from .env.example file then paste inside .env 
8. Replace the database name (DB_DATABASE) to whatever you have, username (DB_USERNAME) and password (DB_PASSWORD) field that correspond to your configurations.
9. Generate unique APP_KEY in .env file: `php artisan key:generate`
10. run `php artisan migrate`



## Usage
1. Start the development server: `npx react-native start`
2. Run the application on a simulator or device:
   - iOS: `npx react-native run-ios`
   - Android: `npx react-native run-android`
3. [Include any additional steps or instructions for using the application]

## Contributing
1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch`
3. Make your changes and commit them: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature-branch`
5. Submit a pull request

## License
[Specify the license under which the application is distributed, e.g., MIT, Apache, GPL, etc.]

## Contact
[Provide contact information for getting support or reporting issues, such as an email address or link to the project's issue tracker]

## Acknowledgements
[Optional: Acknowledge individuals or organizations that contributed to the project or provided inspiration or support]


// .env

/////////////////////////////////////////////////
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
DB_DATABASE=laravelapi
DB_USERNAME=root
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
MAIL_PASSWORD=koakoko123
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

/////////////////////////////////////////////////

