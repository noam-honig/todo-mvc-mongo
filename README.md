# Todo MVC Demo

## Deploy to Heroku
* Note that these steps use postgres on Heroku and not mongo as done in the tutorial
```sh
heroku create
heroku config:set JWT_SECRET=random-secret
heroku addons:create heroku-postgresql:hobby-dev
git add .
git commit -m "todo app deploy"
git push heroku master
heroku apps:open
```

## Installed components:
1. Basic Setup: `axios`, `express` and `remult`
   ```sh
   npm i axios express remult
   npm i --save-dev @types/express ts-node-dev concurrently
   ```
   See [Basic Setup](https://remult.dev/tutorials/react/#option-2-step-by-step-setup)
2. Authentication: `jsonwebtoken`,`jwt-decode` and `express-jwt`
   ```sh
   npm i jsonwebtoken jwt-decode express-jwt
   npm i --save-dev @types/jsonwebtoken 
   ```
   See [Authentication](https://remult.dev/tutorials/react/auth.html#user-authentication)
3. Postgres:
   ```sh
   npm i pg
   npm i --save-dev @types/pg
   ```
   See [Connect to Postgres](https://remult.dev/tutorials/react/deployment.html#connect-to-postgres)
4. MongoDb:
   ```sh
   npm i mongodb
   ```
   See [Connect to MongoDb](https://remult.dev/docs/databases.html#mongodb)
5. For Heroku Deployment:
   ```sh
   npm i compression helmet heroku-ssl-redirect
   npm i @types/compression --save-dev
   ```
   See [Prepare for Production](https://remult.dev/tutorials/vue/deployment.html#prepare-for-production)