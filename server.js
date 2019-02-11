const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const leaderboardController = require('./controllers/leaderboardController');

const app = express();
const PORT = 4000;

mongoose.connect('mongodb://demon:codesmith@ds141889.mlab.com:41889/leaderboards', { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log('Connected to Database'));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('../build'));

app.post('/', leaderboardController.addPlayer);

app.get('/', leaderboardController.getAll);

app.delete('/', leaderboardController.deleteLeaderboard);

app.delete('/sixthPlace', leaderboardController.deleteSixth);

app.listen(process.env.PORT || PORT, () => console.log(`Listening on PORT: ${process.env.PORT || PORT}`));

module.exports = app;