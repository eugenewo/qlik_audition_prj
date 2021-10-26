
# Cloud Audition Project

QLIK - Cloud Audition Project.
(Simple Node.js,Express.js based API)

This is a messages API, with CRUD, JWT ,user authentication and MONGODB.
All messages can be viewed by all members but the actual update and delete is based on authentication.
(i.e only the creator of the message is able to delete and update)

After cloning the app via public github link(https://github.com/eugenewo/qlik_audition_prj)
open it in your favorite IDE and run npm install.
To run the project use this command  -> npm run start:server 

This project is connected to the mongodb via https://cloud.mongodb.com/.
To access the actual db use MongoDBCompass, and use this connection string 
'mongodb+srv://qlik_user:1qaz2wsx@cluster0.rnavp.mongodb.net/test'
(which can also be found in .env file) or use any local mongodb app, like Robo 3T (which is totally free)

API can be tested via shared POSTMAN link : https://www.getpostman.com/collections/d861b7797eaff78ed3a3

## API Reference

#### User signup

```http
  POST /api/user/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### User login

```http
  POST /api/user/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### returns a token(type: Bearer Token) which will be used for CRUD operations on messages

#### List all messages

```http
  GET /api/messages
```
#### Get message by id

```http
  GET /api/messages/:id
```

#### Save message

```http
  POST /api/messages
```
  
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` | **Required**. |
| `content` | `string` | **Required**. |
|`token`| `string` | **Required**. |

#### Delete message by id
```http
  DELETE /api/messages/:id
```
  
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|`token`| `string` | **Required**. |

#### Update message by id

```http
  PUT /api/messages/:id
```
  
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` | **Required**. |
| `content` | `string` | **Required**. |
|`token`| `string` | **Required**. |


## Authors(eugene wolfman)

- [@github link](https://github.com/eugenewo/qlik_audition_prj)

  