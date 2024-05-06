export class BlogManager{
    blogPosts = new Map();
    date = new Date();

    constructor(){}

    deletePost(id){
        this.blogPosts.delete(`${id}`);
    }

    has(id){
        return this.blogPosts.has(`${id}`);
    }

    savePost(postData, id = this.blogPosts.size){
        console.log(postData)
        const newOrUpdatedPost = { 
            title: postData['titleField'].trim(), 
            content: postData['postField'].trim(),
            imgUrl: !postData['imgUrlField'] ? 'imgs/picturePlaceholder.jpg' : postData['imgUrlField'],
            created_at: this.date.toDateString(),
        }
        
        console.log(newOrUpdatedPost);
        //TODO find a different way to set ids to posts.
        this.blogPosts.set(`${id}`, newOrUpdatedPost);
    }

    getPosts(){
        return this.blogPosts;
    }

    getPost(id){
        return this.blogPosts.get(`${id}`);
    }
}