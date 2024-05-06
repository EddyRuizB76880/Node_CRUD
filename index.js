/*
1. Post Creation: Users should be able to create new posts.

2. Post Viewing: The home page should allow the user to view all their posts.

3. Post Update/Delete: Users should be edit and delete posts as needed.

4. Styling: The application should be well-styled and responsive, ensuring a good user experience on both desktop and mobile devices.
    use jQuery and Bootstrap
*/
import express from 'express';
import bodyParser from 'body-parser';
import { BlogManager } from './BlogManager.js';

const app = express();
const blogManager = new BlogManager();

const MAIN_PAGE = 'main_page.ejs';

const ALERT_BOX_DELETION_TEXT = {
    header:'WARNING',
    title:'Deleting Post!',
    description: 'Deleting a post is permanent. You will not recover it in any way ',
    confirmationText: 'Delete Anyway',
    confirmStyle: 'btn-danger'
}

app.use(express.static('public/'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.render(MAIN_PAGE, {existingBlogs: blogManager.getPosts(), alert: ALERT_BOX_DELETION_TEXT});
} )

app.get('/create', (req, res)=>{
    res.render('blog.ejs', {siteTitle: 'Create a new Post', action: 'create'});
})

app.post('/create', (req, res)=>{
    let postContent = req.body
    console.log(postContent);
    blogManager.savePost(postContent);
    //res.sendStatus(201);
    res.render(MAIN_PAGE, {existingBlogs: blogManager.getPosts(), alert: ALERT_BOX_DELETION_TEXT, overlayText: 'New post created!'})
} )

app.get('/edit/:id', (req, res)=>{
    if(blogManager.has(req.params.id)){
        res.render('blog.ejs', {siteTitle: 'Edit your post', content: 'Holis', action: `edit/${req.params.id}`, post: blogManager.getPost(req.params.id)});
    } else {
        // show 404 
        res.render(MAIN_PAGE, {existingBlogs: blogManager.getPosts(), alert: ALERT_BOX_DELETION_TEXT ,overlayText: 'Post not found...'})
    }
} )

app.post('/edit/:id', (req, res)=>{
    blogManager.savePost(req.body, req.params.id);
    res.render(MAIN_PAGE, {existingBlogs: blogManager.getPosts(), alert: ALERT_BOX_DELETION_TEXT, overlayText: 'Post Updated!'}) 
})

app.get('/view/:id', (req, res)=>{
      if(blogManager.has(req.params.id)){
          res.render('blog.ejs', {siteTitle: 'Read your post', content: 'Holis', action: 'view', post: blogManager.getPost(req.params.id)});
      } else {
        // show 404 
        res.render(MAIN_PAGE, {existingBlogs: blogManager.getPosts(), alert: ALERT_BOX_DELETION_TEXT, overlayText: 'Post not found...'})
      }
} )


app.delete('/delete/:id', (req, res)=>{
    console.log(req.params.id);
    blogManager.deletePost(`${req.params.id}`);
    res.sendStatus(200);
} )

app.listen(3000, ()=>{
    console.log('listening');
});

app.get('*', (req, res) => {
    res.status(404).send("<div>404 Not Found</div>");
});