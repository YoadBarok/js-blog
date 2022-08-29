class PostRepository{

    posts = [
        {
          id: 1,
          title: "first post",
          body: "first post body",
          points: 0,
          userId: 1  
        },
        {
          id: 2,
          title: "second post",
          body: "second post body",
          points: 0,
          userId: 2  
        },
    ];

    findAll() {
        return this.posts;
    }

    findById(postId) {
        return this.posts.find(post => post.id === postId);
    }

    saveNew(post) {
        this.posts.push(post);
    }

    update(post) {
        let indexToReplace = this.posts.indexOf(this.posts.find(p => p.id === post.id));
        this.posts.splice(indexToReplace, 1, post);
        return post;
    }

    destroy(post) {
        this.posts = this.posts.filter(p => p.id !== post.id);
    }

    findAllPostsByUserId(userId) {
        return this.posts.filter(post => post.userId === userId);
    }

}

const postRepository = new PostRepository();
export {postRepository};