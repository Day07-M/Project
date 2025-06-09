// Don't touch, connected to db post-app of mysql. Routes been updated to use db instead
// reminder: Revise and relearn the logic 

import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import mysql2 from "mysql2";

const app = express();
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '17122002LoL~',
    database: 'post_app'
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


let posts = []; 
let nextId = 1;

app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    db.query('SELECT * FROM posts ORDER BY id DESC', (err, results) => {
        if (err) throw err;
        res.render('index', { posts: results});
    });
//   res.render('index', { posts: posts });
});

app.get("/about",(req, res) => {
    res.render("about.ejs");
});

app.get('/post', (req, res) => {
  res.render('post');
});


app.post('/save-post', (req, res) => {
const { title, content } = req.body;
db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], (err) => {
    if (err) throw err;
    res.redirect('/');
});

//   const newTitle = req.body.title.trim();
//   const newContent = req.body.content.trim();
//   if (newTitle !== '' && newContent !== '') {
//     posts.push({ id: nextId++, title: newTitle, content: newContent });
//   }
//   res.redirect('/');
});

// Dis one to view a single post based on the id stored db
app.get('/post/:id', (req, res) => {
  
   db.query('SELECT * FROM posts WHERE id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) return res.send('Post not found');
    res.render('view-post', { post: results[0] });
  });

  // While this one is to view a single post based on the id stored locally using array
//   const post = posts.find(p => p.id === parseInt(req.params.id));
//   if (!post) return res.status(404).send('Post not found');
//   res.render('view-post', { post });
});


app.get('/edit/:id', (req, res) => {
    
    db.query('SELECT * FROM posts WHERE id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.render('edit-post', { post: results[0] });

  });
//   const post = posts.find(p => p.id === parseInt(req.params.id));
//   if (!post) return res.status(404).send('Post not found');
//   res.render('edit-post', { post });
});


app.post('/edit/:id', (req, res) => {

    const { title, content } = req.body;
    db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, req.params.id], (err) => {
    if (err) throw err;
    res.redirect(`/post/${req.params.id}`);

});


//   const post = posts.find(p => p.id === parseInt(req.params.id));
//   if (post) {
//     post.title = req.body.title.trim();
//     post.content = req.body.content.trim();
//   }
//   res.redirect(`/post/${post.id}`);
 });


// Note to self: Relearn necessary for next project
app.post('/delete/:id', (req, res) => {
  db.query('DELETE FROM posts WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.redirect('/');
  });  

//   posts = posts.filter(p => p.id !== parseInt(req.params.id));
//   res.redirect('/');
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Blog app running at http://localhost:${PORT}`));
