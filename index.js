const express = require(`express`)
const server = express()
const Users = require(`./data/db.js`)

server.use(express.json()) //parse the responses to json for the frontend to recieve in a readible fashion

server.get(`/`, function (request, response) {
    //read data from the datasbase(Users)
    response.send({ hey: 'servers up tuck!' })
})

//GET list of users
//returns an array of all the user objects contained in the database


server.get(`/api/users`, (req, res) => {

    //read the data from the database Users aka ./data/db.js
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: "The users information could not be retrieved." })
        });
});
server.post('/api/users', (req, res) => {
    (!req.params.name || !req.params.bio) ?
        (res.status(400).json({ errorMessage: "Please provide name and bio for the user." }))
        :
        Users.insert(req.body)
            .then(user => {
                res.status(201).json({ user });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: 'There was an error while saveing the user to the database' })
            })
})
server.get('/api/users/:id', (req, res) => {
    Users.findByid(req.params.id).then(user => {
        user ?
            res.status(200).json(user)
            :
            res.status(404).json({ message: 'The user with the specified ID does not exist.' });
    })
        .catch(error => { console.log(error); res.status(500).json({ errorMessage: "The user information could not be retrieved." });
     });
})


server.delete('/api/users/:id', (req, res) => {
    Users.remove(req.params.id).then(count => { count > 0 ? res.status(200).json({ message: `Successfully deleted ${count} user(s)` })})
})
server.put('/api/users/:id')
const port = 7000;
server.listen(port, () => console.log(`\n ** api on port : ${port} ** \n`))