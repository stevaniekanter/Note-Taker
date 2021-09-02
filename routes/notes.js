const notes = require('express').Router();
import { v4 as uuidv4 } from 'uuid';
import { readFile, writeFile } from 'fs';

// get routes for the note
notes.get('/', (req, res) => {
    readFile('./db/db.json', (err, data) => {
        if (err) {console.log(err);}
        else {res.json(JSON.parse(data));}
    });
});

//  post request 
notes.post('/', (req, res) => {
    const { title, text } = req.body;
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
      readFile('./db/db.json', (err, data) => {
        if (err) {console.log (err);}
        else {
          parsedData = JSON.parse(data);
          parsedData.push(newNote);
          startData = JSON.stringify(parsedData);
          writeFile("./db/db.json", startData, (err) => {
            if (err) {
              console.log (err);
            } else {
              readFile("./db/db.json", (err, data) => {
                if (err) {
                  console.log(err);
                } else {
                  res.json(JSON.parse(data));
                }
              });
            }
          });
        }
      });
    } else {
      res.error("Error, note not saved.");
    }
});

// detele request
notes.delete("/:id", (req, res) => {
    const id = req.params.id;
    readFile("./db/db.json", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        parsedData = JSON.parse(data);
        filterData = parsedData.filter((note) => note.id !== id)
        startData = JSON.stringify(filterData)
        writeFile("./db/db.json", startData, (err) => {
          if (err) {
            console.log (err);
          } else {
            readFile("./db/db.json", (err, data) => {
              if (err) {
                console.log(err);
              } else {
                res.json(JSON.parse(data));
              }
            });
          }
        });
      }
    });
});
  
export default notes;