//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose")
conCheck();
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function conCheck(){
try{
  await mongoose.connect("mongodb://127.0.0.1/blogdb");
  console.log("connected");
}catch(err){
console.log(err);
}
}


const postSchema = {
  title:String,
  body:String
}

const Post = mongoose.model("Post",postSchema);


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";




// const posts=[];


app.get("/", function (req, res) {
  Post.find({})
  .then((posts) => {
    console.log(posts);
    res.render("home", { home: "HOM", startingContent: homeStartingContent, posts:posts});
  })
  .catch(err => {
    // Handle any errors that occurred during the query
    console.error(err);
    res.status(500).send("Error occurred during the database query.");
  });

  
});


app.get("/about", function (req, res) {
  res.render("about", { aboutTitle: "About", aboutData: aboutContent });
})

app.get("/contact", function (req, res) {
  res.render("contact", { contactTitle: "Contact", contactData: contactContent });
})

app.get("/compose", function (req, res) {
  res.render("compose", { composeTitle: "Compose" });
})
app.post("/compose", function (req, res) {
 
  const post = new Post({
    title: req.body.composeTitle,
    body: req.body.composeData
  })

  console.log(post);
  post.save();
  res.redirect("/");
});

app.get("/posts/:postId", function (req, res) {

  const postreq =req.params.postId;
  console.log(postreq);

  Post.find({})
  .then((posts) => {
  posts.forEach(function (post) {
    var post_id = post._id;
    console.log(post_id + "______" + postreq);
    if (post_id == postreq) {
      console.log("match found");
      res.render("post", { postTitle: post.title, postData: post.body });
    }

  });
}) .catch(err => {
  // Handle any errors that occurred during the query
  console.error(err);
  res.status(500).send("Error occurred during the database query.");
});
});







app.listen(process.env.PORT || 3000,function(req,res){
  console.log("Server Started .........");
})