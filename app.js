var express = require('express');
var app = express()
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json')
var User = require('./models/User')

mongoose.connect('mongodb://localhost:27017/sbm', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connection successfull !')
});

app.use(bodyParser.json())

app.post('/user', (req, res) => {
    var user = new User(req.body)
    user.save((err, result) => {
        if (err) {
            throw new err;
        } else {
            res.send("User saved successfully");
        }
    })

})

app.get('/users', (req, res) => {
    User.find({}, (err, result) => {
        if (err) {
            throw new err;
        } else {
            res.send(JSON.stringify(result));
        }
    })
})


app.get('/users/:id', (req, res) => {
    User.findOne({ _id: req.params.id }, (err, result) => {
        if (err) {
            throw new err;
        } else {
            res.send(JSON.stringify(result));
        }
    })
})

app.put('/users/:id', (req, res) => {
    let msg = {
        message: "User updated successfully"
    }
    User.findOneAndUpdate({ _id: req.params.id }, req.body, (err, result) => {

        if (err) {
            throw new err;
        } else {
            res.send(msg);
        }
    })

})

app.delete('/users/:id', (req, res) => {
    let msg = {
        message: "User deleted successfully"
    }
    User.findOneAndDelete({ _id: req.params.id }, req.body, (err, result) => {
        if (err) {
            throw new err;
        } else {
            res.send(msg);
        }
    })
})






app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
    console.log('Server started !')
})