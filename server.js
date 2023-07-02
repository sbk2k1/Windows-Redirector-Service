const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const mongoose = require('mongoose');

// connect to mongodb
const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/redirects", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }
}

connect();

// create schema to store just words (this is just to prevent duplicates)

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true
  }
});

const Word = mongoose.model('Word', wordSchema);

// Specify the path to the Apache configuration files
const vhostsFilePath = '../insert/path/to/httpd-vhosts.conf';
const hostsFilePath = '../insert/path/to/Windows/System32/drivers/etc/hosts';

// Create Express app
const app = express();
app.use(express.urlencoded({ extended: true }));

// Serve the create-redirect form
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
          body {
            background: radial-gradient(circle at 10% 20%, rgb(69, 86, 102) 0%, rgb(34, 34, 34) 90%);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            padding: 0;
          }

          .form-container {
            background: radial-gradient(
              circle at 7.5% 24%,
              rgb(237, 161, 193) 0%,
              rgb(250, 178, 172) 25.5%,
              rgb(190, 228, 210) 62.3%,
              rgb(215, 248, 247) 93.8%
            );
            border-radius: 8px;
            box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
            padding: 24px;
            width: 400px;
          }

          h1 {
            text-align: center;
            font: 400 24px/1.5 Helvetica, Verdana, sans-serif;
          }

          input[type="text"] {
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 10px;
            width: 100%;
          }

          button[type="submit"] {
            display: block;
            width: 100%;
            padding: 12px;
            background-color: #4caf50;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <div class="form-container">
          <h1>Create Redirect</h1>
          <form action="/create-redirect" method="post">
            <input type="text" name="word" id="word" required placeholder="Word" autocomplete="off"><br><br>
            <input type="text" name="website" id="website" required placeholder="Website" autocomplete="off"><br><br>
            <button type="submit">Create</button>
          </form>
        </div>
      </body>
    </html>
  `);
});


// on being redirected to 

// Handle form submission to create a new redirect
app.post('/create-redirect', async (req, res) => {
  try {
    const { word, website } = req.body;

    // Check if the word is already in the database
    const wordExists = await Word.exists({ word });

    if (wordExists) {
      console.error(`Failed to create mapping: ${word} already exists!`);
      return res.redirect('/');
    }

    // Add the word to the database
    const newWord = new Word({ word });

    await newWord.save();

    // Update the vhosts file
    const vhostsConfig = `
      <VirtualHost *:80>
        ServerName ${word + ".local"}
        Redirect / ${website}
      </VirtualHost>
    `;
    fs.appendFileSync(vhostsFilePath, vhostsConfig);

    // Update the hosts file
    const hostsEntry = `127.0.0.1 ${word + ".local"}\n`;
    fs.appendFileSync(hostsFilePath, hostsEntry);

    // Restart Apache
    exec('net stop Apache2.4 && net start Apache2.4', (error) => {
      if (error) {
        console.error(`Failed to restart Apache: ${error.message}`);
      } else {
        console.log(`Successfully created mapping: ${word} -> ${website}`);
        res.redirect('/');
      }
    });
  } catch (error) {
    console.error(`Failed to create mapping: ${error.message}`);
    res.status(500).send('Failed to create mapping!');
  }
});


// Start the server
const port = 13666;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
