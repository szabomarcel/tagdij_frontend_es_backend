const express = require('express');
const app = express(); //-- http szervert tudunk vele 
const buttonRead = document.querySelector("#read");
const add = require('create');
const deleted = require('detele');
const updated = require('updated');
// JSON adatok fogadása miatt
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tagdij'
});

db.connect((err) => {
    if(err) throw err;
    console.log('Connected!');
});

// összes ügyfél lekérdezése
app.get('/tagok', (req, res) => {
    let sqlcommand = 'SELECT * FROM ugyfel';
    db.query(sqlcommand, (err, rows) => {
        if(err) throw err;
        res.send(rows);
    });
});

// egy adott ügyfél lekérdezése
app.get('/tagok/:id', (req, res) => {
    let sqlcommand = `SELECT * FROM ugyfel WHERE azon = ${req.params.id}`;
    db.query(sqlcommand, (err, rows) => {
        if(err) throw err;
        res.send(rows);
    });
});

// egy új ügyfél adatainak a rögzítése az adatbázisban
app.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // SELECT * FROM ugyfel WHERE azon = ${req.params.id}
    var add = `INSERT INTO ugyfel VALUES azon: ${req.params.id}, neve: ${req.params.nev}, születésiéve: ${req.params.szulev}, irányítószám: ${req.params.irszam}, ország: ${req.params.orsz}`;
    con.send(rows)       
    console.log("1 record inserted");    
});

// ügyfél törlése
app.set(dir, { req, res}, err => {
    let deleted = "DELETE FROM `ugyfel` WHERE `azon`";
    if (err) throw err;
    res.send(deleted);
    //console.log(`${id} is deleted!`);
});

// ügyfél adatainak a törlése
app.set(dir, { req, res}, err => {
    let deleted = "DELETE FROM `ugyfel` WHERE `azon`, `nev`, `szulev`, `irszam`, `orsz`" //"DELETE FROM `ugyfel` WHERE `ugyfel`.`azon`= ?, `ugyfel`.`nev`= ?, `ugyfel`.`szulev`= ?, `ugyfel`.`irszam`= ?; `ugyfel`.`orsz`= ?";
    if (err) throw err;
    res.send(deleted);
    //console.log(`${id}, ${nev}, ${szulev}, ${irszam}, ${orsz} is deleted!`);
});

// ügyfél adatainak a módosítása
app.set(dir, { req, res}, err => {
    let UPDATE = "UPDATE `ugyfel` SET `azon`='[value-1]',`nev`='[value-2]',`szulev`='[value-3]',`irszam`='[value-4]',`orsz`='[value-5]' WHERE 1";
    if (err) throw err;
    res.send(UPDATE);
    //console.log(`${id}, ${nev}, ${szulev}, ${irszam}, ${orsz} is deleted!`);
});

// 3000-re viszi a működéshez képest
app.listen(3000, () => {
    console.log('Server is runinng on port 3000');
});