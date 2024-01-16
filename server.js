const express = require('express');
const users = require('./MOCK_DATA.json');

const app = express();

// routes
app.get('/', (req, res) => {
  return res.json({data: 'success'});
});

//it is best practice to add api in url because it helps to mobile app developers to identify the api
// if we didn't use api it will seems as an html response, and if we use api it expected a json response

// it is good practice for creating a hybrid server
// Rest api
app.get('/api/users', (req, res) => {
  return res.json(users);
});

//see the difference . this practice is used in server side rendering
app.get('/users', (req, res) => {
  let usersNames = `
    <ul>
    ${users
      .map((user, index) => `<li>${index} : ${user.first_name}</li>`)
      .join('')}
    </ul>`;
  return res.send(usersNames);
});

app.get('/api/users/:id', (req, res) => {
  let id = Number(req.params.id);
  let user = users.find(user => user.id === id);
  return res.json(user);
});

// if we can same url on different request like get, patch, delete we can simply write like this

app
  .route('/api/usersdata/:id')
  .get((req, res) => {
    return res.json({message: 'data is given'});
  })
  .patch((req, res) => {
    return res.json({message: 'data is updated'});
  })
  .delete((req, res) => {
    return res.json({message: 'data is deleted'});
  });

app.use((err, req, res, next) => {
  console.error(err);
  // Handle the error response appropriately
  res.status(500).json({error: 'Internal Server Error'});
});
app.listen(4000, () => console.log('app running on http://localhost:4000'));
