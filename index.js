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
            res.status(200).json(hubs);
        })
        .catch(error => {
            console.log(error);
            res.state(500).json({ errorMessage: "The users information could not be retrieved." })
        });
});

const port = 7000;
server.listen(port,()=>console.log(`\n ** api on port : ${port} ** \n`))