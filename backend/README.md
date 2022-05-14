## Code examples to manually test in browser

Create User

```javascript
const user = {
  email: 'test@gmail.com',
  password: '123123123',
  passwordConfirmation: '123123123',
  name: 'OneTwoThree',
}

fetch('http://localhost:1337/api/users', {
  method: 'POST',
  body: JSON.stringify(user),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then(res => res.json())
  .then(console.log)
```

Create Session

```javascript
const userLogin = {
  email: 'test@gmail.com',
  password: '123123123',
}

fetch('http://localhost:1337/api/sessions', {
  method: 'POST',
  body: JSON.stringify(userLogin),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then(res => res.json())
  .then(console.log)
```