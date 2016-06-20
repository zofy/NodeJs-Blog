var express = require("express"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride = require('method-override'),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();

// APP CONFIG
mongoose.connect('mongodb://localhost/REstfulBlogApp2');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    dateOfCreation: {type: Date, default: Date.now()}
});

var Blog = mongoose.model('Blog', blogSchema);

// Blog.create({title: 'Doggy', image: '', body: 'Blog post about doggy'})

//RESTful routing

app.get('/', function(req, res){
    res.redirect('/blogs');
});

// Index route
app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
       if(err){
           console.log('Error');
       } else{
           res.render('index', {blogs: blogs});
       }
    });
});

// Create route
app.post('/blogs', function(req, res){
    console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    console.log(req.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if (err){
            res.render('new');
        }else{
            res.redirect('/blogs');
        }
    });
});

// New route
app.get('/blogs/new', function(req, res){
    res.render('new');
});

// Show route
app.get('/blogs/:id', function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log('Error finding the blog!');
            res.redirect('/blogs');
        }else{
            res.render('show', {blog: blog});
        }
    });
});

// Edit route
app.get('/blogs/:id/edit', function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log('Couldn`t find the blog  post');
            res.redirect('/blogs');
        }else{
            res.render('edit', {blog: blog});
        }
    });
});

// Update route
app.put('/blogs/:id', function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect('/blogs');
        }else{
            res.redirect('/blogs/' + req.params.id.toString());     
        }
    });
});

// Delete route
app.delete('/blogs/:id', function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log('Couldn`t find the blog post!');
        }
        res.redirect('/blogs');
    })
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server has started!'); 
});