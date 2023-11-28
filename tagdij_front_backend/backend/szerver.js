const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tagdij'
});

// 3000-re viszi a működéshez képest
app.listen(3000, () => {
    console.log('Server is runinng on port 3000');
});