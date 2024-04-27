/*
1. Post Creation: Users should be able to create new posts.

2. Post Viewing: The home page should allow the user to view all their posts.

3. Post Update/Delete: Users should be edit and delete posts as needed.

4. Styling: The application should be well-styled and responsive, ensuring a good user experience on both desktop and mobile devices.
    use jQuery and Bootstrap
*/
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const blogPosts = new Map();
const date = new Date();

app.use(express.static('public/'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.render('main_page.ejs', {existingBlogs: blogPosts});
} )

app.get('/create', (req, res)=>{
    res.render('blog.ejs', {siteTitle: 'Create a new Post', content: 'Holis', action: 'create'});
})

app.post('/create', (req, res)=>{
    console.log(req.body);
    savePost(blogPosts.size, req.body);
    res.render('main_page.ejs', {existingBlogs: blogPosts, overlayText: 'New post created!'})
} )

app.get('/edit/:id', (req, res)=>{
    if(blogPosts.has(req.params.id)){
        res.render('blog.ejs', {siteTitle: 'Edit your post', content: 'Holis', action: `edit/${req.params.id}`, post: blogPosts.get(req.params.id)});
    } else {
        // show 404 
        res.render('main_page.ejs', {existingBlogs: blogPosts, overlayText: 'Post not found...'})
    }
} )

app.post('/edit/:id', (req, res)=>{
    savePost(req.params.id, req.body);
    res.render('main_page.ejs', {existingBlogs: blogPosts, overlayText: 'Post Updated!'}) 
})

app.get('/view/:id', (req, res)=>{
      if(blogPosts.has(req.params.id)){
          res.render('blog.ejs', {siteTitle: 'Read your post', content: 'Holis', action: 'view', post: blogPosts.get(req.params.id)});
      } else {
        // show 404 
        res.render('main_page.ejs', {existingBlogs: blogPosts, overlayText: 'Post not found...'})
      }
} )


app.delete('/delete/:id', (req, res)=>{
    console.log(req.params.id);
    blogPosts.delete(`${req.params.id}`);
    res.sendStatus(200);
} )

app.listen(3000, ()=>{
    console.log('listening');
});

app.get('*', (req, res) => {
    res.status(404).send("<div>404 Not Found</div>");
});


function savePost(id, postData){
    console.log(postData)
    const newOrUpdatedPost = { 
        title: postData['titleField'].trim(), 
        content: postData['postField'].trim(),
        imgUrl: !postData['imgUrlField'] ? 'imgs/picturePlaceholder.jpg' : postData['imgUrlField'],
        created_at: date.toDateString(),
    }
    
    console.log(newOrUpdatedPost);
    blogPosts.set(`${id}`, newOrUpdatedPost);
}