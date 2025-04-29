# Membership Service

### Tech Stack

- **Backend**: Node.js, Express, Typescript
- **Others**: Joi, bcrypt, Jest, Supertest, Eslint, Prettier

### Folder Structure

```
├── src/
│   ├── constants/   # Shared constants
│   ├── features/    # Application Features (model, route, service, type, etc.)
│   ├── middleware/  # Shared middleware
│   ├── utilities/   # Helper functions and utilities
└── tests            # All Project unit tests
└── package.json     # Project and dependencies
```

### Pre-install

- **[node.js](https://nodejs.org/en/download)**
- **[yarn](https://classic.yarnpkg.com/lang/en/docs/install)**

### Installation

Follow these steps to get started with the project:

1. **Navigate to the project directory**:

   ```bash
   cd membership-service
   ```

2. **Install dependencies**:

   ```bash
   yarn install
   ```

3. **Start the development server**:

   ```bash
   yarn dev
   ```

Access the app at http://localhost:3000

### User API Routes

| Method   | Endpoint                 | Description                                         |
| :------- | :----------------------- | :-------------------------------------------------- |
| `GET`    | `/api/user`              | Get all users (requires Authorization)              |
| `GET`    | `/api/user/:id`          | Get user by ID (requires Authorization)             |
| `PUT`    | `/api/user/:id`          | Update user by ID (requires Authorization)          |
| `DELETE` | `/api/user/:id`          | Delete user by ID (requires Authorization)          |
| `PUT`    | `/api/user/:id/password` | Change user password by ID (requires Authorization) |
| `POST`   | `/api/user/register`     | Register a new user (no Authorization required)     |

### Authorization

- All routes **except** `POST /api/user/register` require a valid `Authorization: Bearer <token>` header.

### Notes

- If the token is missing or invalid, API will return `401 Unauthorized`.
- `POST /api/user/register` expects required fields like `email`, `password`, `name`, `dateOfBirth`, `gender`, `address`, and `isSubscribeNewsletter`.
