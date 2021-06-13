const express = require('express');
const db = require('./db/connection');
const runApp = require('./app');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});


db.connect(function (err) {
    if (err) throw err;
    console.log("id connection" + db.threadId);
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    runApp();
})


