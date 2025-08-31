/*
1. Post Creation: Users should be able to create new posts.

2. Post Viewing: The home page should allow the user to view all their posts.

3. Post Update/Delete: Users should be edit and delete posts as needed.

4. Styling: The application should be well-styled and responsive, ensuring a good user experience on both desktop and mobile devices.
    use jQuery and Bootstrap
*/
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');
const db = require('./database');

const app = express();

app.use(express.static('public/'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

db.sync().then(result => {
    app.listen(3000, ()=>{
        console.log('listening');
    });
});