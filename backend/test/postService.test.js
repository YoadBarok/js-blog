import {PostService} from "../src/services/postService.js";
import {VoteService} from "../src/services/voteService.js";
import {postRepository} from "./mockedRepositories/postRepository.js";
import {voteRepository} from "./mockedRepositories/voteRepository.js";


const voteService = new VoteService(voteRepository);
const postService = new PostService(postRepository, voteService);

describe("CRUD tests", () => {
    test("posts count should return 2", async () => {
        let allPosts = await postService.serveAllPosts();
        expect(allPosts.length).toBe(2);
    });
    test("post with ID 1 has title: 'first post'", async () => {
        let post = await postService.servePostById(1);
        expect(post.title).toBe("first post");
    });
    test("saving a new post increases the post count, and the new post can be fetched", async () => {
        const postToSave = {
            id: 3,
            title: "third post",
            body: "third post body",
            points: 0,
            userId: 1
        }
        await postService.savePost(postToSave);
        let allPosts = await postService.serveAllPosts();
        let newlyAddedPost = await postService.servePostById(3);
        expect(allPosts.length).toBe(3);
        expect(newlyAddedPost.title).toBe("third post");
    });
    test("serving all posts by userId 1 returns 2 posts", async () => {
        const userOnePosts = await postService.servePostsByUserId(1);
        expect(userOnePosts.length).toBe(2);
    });
    test("deleting the post with id 1 removes it from the posts, and reduces posts count", async () => {
        let postToDelete = await postService.servePostById(1);
        await postService.deletePost(postToDelete);
        let allPosts = await postService.serveAllPosts();
        expect(allPosts.length).toBe(2);
        expect(allPosts.find(p => p.id === 1)).toBeFalsy();
    })
})

describe("Voting tests", () => {
    const getPost = async (postId) => await postService.servePostById(postId);
    test("Upvoting post increases its points by 1, and after upvoting it again decrease points by 1", async () => {
        let postToUpvote = await getPost(2);
        expect(postToUpvote.points).toBe(0);
        await postService.upVotePost(postToUpvote, 1);
        let upvotedPost = await getPost(2);
        expect(upvotedPost.points).toBe(1);
        await postService.upVotePost(postToUpvote, 1);
        let unUpVotedPost = await getPost(2);
        expect(unUpVotedPost.points).toBe(0);
    });
    test("Downvoting post decreases its points by 1, and after downvoting again increase points by 1", async () => {
        let postToDownVote = await getPost(3);
        expect(postToDownVote.points).toBe(0);
        await postService.downVotePost(postToDownVote, 2);
        let downVotedPost = await getPost(3);
        expect(downVotedPost.points).toBe(-1);
        await postService.downVotePost(downVotedPost, 2);
        let unDownVotedPost = await getPost(3);
        expect(unDownVotedPost.points).toBe(0)
    });
    test("voting on your own post should return: 'can't vote on your own post'", async () => {
        let postToUpvote = await getPost(2);
        expect(await postService.upVotePost(postToUpvote, 2)).toBe("can't vote on your own post");
        let attemptedUpVotePost = await getPost(2);
        expect(attemptedUpVotePost.points).toBe(0);
        let postToDownVote = await getPost(2);
        expect(await postService.downVotePost(postToDownVote, 2)).toBe("can't vote on your own post");
        let attemptedDownVotePost = await getPost(2);
        expect(attemptedDownVotePost.points).toBe(0);
    })

})