# **Blog API Application**

## Tech Stack

**Server:** NodeJs, ExpressJs, MongoDB, Mongoose, JWT

# API FEATURES

- Authentication & Authorization
- Post CRUD operations
- User can like/dislike posts
- Comment functionality
- User can create categories for posts
- User can block/unblock different users
- User who block another user cannot see his/her posts
- Last date a post was created
- Check if a user is active or not
- Check last date a user was active
- Changing user award based on number of posts created by the user
- User can follow and unfollow another user
- Get following and followers count
- Get total profile viewers count
- Get posts created count
- Get blocked counts
- Get all users who views someone's profile
- Update user details and password
- User can upload and update profile photo
- Admin can block/unblock a user
- User can close his/her account

# ENDPOINTS

- [API Authentication](#api-authentication)

  - [Register a new API client](#register-a-new-api-client)
  - [Login](#user-login)

- [Users](#user-api-reference)

  - [Get my profile](#get-my-profile)
  - [Get all users](#get-all-users)
  - [View a user profile](#view-a-user-profile)
  - [Following a user](#following-a-user)
  - [Unfollowing a user](#unfollowing-a-user)
  - [Update user password](#update-user-password)
  - [Update your profile](#update-your-profile)
  - [Block another user](#block-user)
  - [Unblock another user](#unblock-user)
  - [Admin blocking a user](#admin-blocking-a-user)
  - [Admin Unblocking a user](#admin-unblocking-a-user)
  - [Delete your account](#delete-your-account)
  - [Upload Profile Photo](#upload-profile-photo)

- [Posts](#post-api-reference)

  - [Create Post](#create-post)
  - [Get All Posts](#get-all-posts)
  - [Get Single Post](#get-single-post)
  - [Toggle Post like](#toggle-post-like)
  - [Toggle Post dislike](#toggle-post-dislike)
  - [Update Post](#update-post)
  - [Delete Post](#delete-post)

- [Comments](#comment-api-reference)
  - [Create comment](#create-comment)
  - [Update post](#update-comment)
  - [Delete post](#delete-comment)

- [Category](#category-api-reference)
  - [Create category](#create-category)
  - [Get single category](#get-single-category)
  - [Get all categories](#get-all-categories)
  - [Update category](#update-category)
  - [Delete category](#delete-category)

## Run Locally

Clone the project

```bash
  git clone https://github.com/Himanshu8862/BlogAPI
```

Go to the project directory

```bash
  cd BlogAPI
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run server
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

#### `MONGODB_URL` , `JWT_TOKEN` ,  `CLOUDINARY_CLOUD_NAME` , `CLOUDINARY_API_KEY` , `CLOUDINARY_API_SECRET_KEY`
##### baseURL = `https://blog-api-6y9o.onrender.com/`

# **API Authentication**

Some endpoints may require authentication. For example, to create a create/delete/update post, you need to register your API client and obtain an access token.

The endpoints that require authentication expect a bearer token to be sent in the `Authorization header`

**Example**:

`Authorization: Bearer <YOUR_TOKEN>`

## **Register a new API client**

```http
POST /api/v1/users/register
```

| Parameter        | Type     | Description   | Required |
| :--------------- | :------- | :------------ | :------- |
| `authentication` | `string` | Your token    | no       |
| `firstname`      | `string` | Your firstname| yes      |
| `lastname`       | `string` | Your lastname | yes      |
| `email`          | `string` | Your email    | yes      |
| `password`       | `string` | Your password | yes      |

The request body needs to be in JSON format.
```javascript
{
  "firstname": "John",
  "lastname": "Doe",
  "password": "myPassword",
  "email": "john@gmail.com"
}
```

# **User API Reference**

## **User Login**

```http
POST /api/v1/users/login
```

| Parameter        | Type     | Description   | Required |
| :--------------- | :------- | :------------ | :------- |
| `authentication` | `string` | Your token    | no       |
| `email`          | `string` | Your email    | yes      |
| `password`       | `string` | Your password | yes      |

Example request body:

```javascript
{
  "email": "your email"
  "password": "your password"
}
```

## **Get my profile**

```http
GET /api/v1/users/profile
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | yes      |

## **Get all users**

```http
GET /api/v1/users/
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | no       |

## **View a user profile**

```http
GET /api/v1/users/profile-viewers/:id
```

| Parameter        | Type     | Description                                   | Required |
| :--------------- | :------- | :-------------------------------------------- | :------- |
| `authentication` | `string` | Your token                                    | yes      |
| `id`             | `string` | ID of the user whose profile you want to view | yes      |

## **Following a user**

```http
GET /api/v1/users/following/:id
```

| Parameter        | Type     | Description                       | Required |
| :--------------- | :------- | :-------------------------------- | :------- |
| `authentication` | `string` | Your token                        | yes      |
| `id`             | `string` | ID of the user you want to follow | yes      |

## **Unfollowing a user**

```http
GET /api/v1/users/unfollowing/:id
```

| Parameter        | Type     | Description                       | Required |
| :--------------- | :------- | :-------------------------------- | :------- |
| `authentication` | `string` | Your token                        | yes      |
| `id`             | `string` | ID of the user you want to unfollow | yes      |

## **Update user password**

```http
PUT /api/v1/users/update-password
```

| Parameter        | Type     | Description         | Required |
| :--------------- | :------- | :------------------ | :------- |
| `authentication` | `string` | Your token          | yes      |
| `password`       | `string` | Enter new password | yes      |

Example request body:

```javascript
{
  "password": "value"
}
```

## **Update your profile**

```http
PUT /api/v1/users
```

| Parameter        | Type     | Description          | Required |
| :--------------- | :------- | :------------------- | :------- |
| `authentication` | `string` | Your token           | yes      |
| `email`          | `string` | Enter your email     | no       |
| `firstname`      | `string` | Enter your firstname | no       |
| `lastname`       | `string` | Enter your lastname  | no       |

Example request body:

```javascript
{
  "email": "value",
  "firstname": "value",
  "lastname": "value",
}
```

## **Block user**

```http
GET /api/v1/users/block/:id
```

| Parameter        | Type     | Description                      | Required |
| :--------------- | :------- | :------------------------------- | :------- |
| `authentication` | `string` | Your token                       | yes      |
| `id`             | `string` | ID of the user you want to block | yes      |

## **Unblock user**

```http
GET /api/v1/users/unblock/:id
```

| Parameter        | Type     | Description                        | Required |
| :--------------- | :------- | :--------------------------------- | :------- |
| `authentication` | `string` | Your token                         | yes      |
| `id`             | `string` | ID of the user you want to unblock | yes      |

## **Admin blocking a user**

```http
PUT /api/v1/users/admin-block/:id
```

| Parameter        | Type     | Description                      | Required |
| :--------------- | :------- | :------------------------------- | :------- |
| `authentication` | `string` | Your token                       | yes      |
| `id`             | `string` | ID of the user admin wants to block | yes      |

## **Admin unblocking a user**

```http
PUT /api/v1/users/admin-unblock/:id
```

| Parameter        | Type     | Description                        | Required |
| :--------------- | :------- | :--------------------------------- | :------- |
| `authentication` | `string` | Your token                         | yes      |
| `id`             | `string` | ID of the user admin wants to unblock | yes      |

## **Delete your account**

```http
DELETE /api/v1/users/delete-account
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | yes      |

## **Upload Profile Photo**

```http
PUT /api/v1/users/profile-photo-upload
```

| Parameter        | Type     | Description     | Required |
| :--------------- | :------- | :-------------- | :------- |
| `authentication` | `string` | Your token      | yes      |
| `profile`   | `string` | Image to upload | yes      |

# **Post API Reference**

## **Create Post**

```http
POST /api/v1/posts
```

| Parameter        | Type     | Description        | Required |
| :--------------- | :------- | :----------------- | :------- |
| `authentication` | `string` | Your token         | yes      |
| `title`          | `string` | Post title         | yes      |
| `description`    | `string` | Post description   | yes      |
| `category`       | `string` | ID of the category | yes      |
| `photo`          | `string` | Image of the post  | yes      |

Example request body:

```javascript
{
  "title": "value",
  "description": "value",
  "category": "value",
  "photo": "photo",
}
```

## **Get All Posts**

```http
GET /api/v1/posts
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | no       |

## **Get Single Post**

```http
GET /api/v1/posts/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | yes      |
| `id`             | `string` | ID of the post | yes      |

## **Toggle Post like**

```http
GET /api/v1/posts/likes/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | yes      |
| `id`             | `string` | ID of the post | yes      |

## **Toggle Post dislike**

```http
GET /api/v1/posts/dislikes/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | yes      |
| `id`             | `string` | ID of the post | yes      |

## **Update Post**

```http
PUT /api/v1/posts/:id
```

| Parameter        | Type     | Description             | Required |
| :--------------- | :------- | :---------------------- | :------- |
| `authentication` | `string` | Your token              | yes      |
| `id`             | `string` | ID of the post          | yes      |
| `title`          | `string` | Title of the post       | yes      |
| `description`    | `string` | Description of the post | yes      |
| `category`       | `string` | ID of the category    | yes      |
| `photo`          | `string` | Photo of the post       | yes      |

Example request body:

```javascript
{
  "title": "value",
  "description": "value",
  "category": "value",
  "photo": "photo",
}
```

## **Delete Post**

```http
DELETE /api/v1/posts/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | yes      |
| `id`             | `string` | ID of the post | yes      |

# **Comment API Reference**

## **Create Comment**

```http
POST /api/v1/comments/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | yes      |
| `id`             | `string` | ID of the post | yes      |
| `description`    | `string` | Description of the comment | yes      |

Example request body:
```javascript
{
  "description": "value"
}
```

## **Get Single Comment**

```http
GET /api/v1/comments/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | yes      |
| `id`             | `string` | ID of the comment | yes      |


## **Delete Comment**

```http
DELETE /api/v1/comments/:id
```

| Parameter        | Type     | Description       | Required |
| :--------------- | :------- | :---------------- | :------- |
| `authentication` | `string` | Your token        | yes      |
| `id`             | `string` | ID of the comment | yes      |

## **Update Comment**

```http
PUT /api/v1/comments/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | yes      |
| `id`             | `string` | ID of the comment | yes      |

Example request body:
```javascript
{
  "description": "value"
}
```

# **Category API Reference**

## **Create Category**

```http
POST /api/v1/categories/
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | yes      |
| `title`    | `string` | title of the category | yes      |

Example request body:
```javascript
{
  "title": "value"
}
```

## **Get Single Category**

```http
GET /api/v1/categories/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | yes      |
| `id`             | `string` | ID of the category | yes      |

## **Get all categories**

```http
GET /api/v1/categories/
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | yes      |


## **Update Category**

```http
PUT /api/v1/categories/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | yes      |
| `id`             | `string` | ID of the category | yes      |
| `title`    | `string` | Title of the category | yes      |

Example request body:
```javascript
{
  "title": "value"
}
```

## **Delete Category**

```http
DELETE /api/v1/categories/:id
```

| Parameter        | Type     | Description       | Required |
| :--------------- | :------- | :---------------- | :------- |
| `authentication` | `string` | Your token        | yes      |
| `id`             | `string` | ID of the category | yes      |
