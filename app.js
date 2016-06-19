var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();

// APP CONFIG
mongoose.connect('mongodb://localhost/REstfulBlogApp2');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

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

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server has started!'); 
});