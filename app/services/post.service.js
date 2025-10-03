import prisma from "../models/handler.model.js";

class PostService {
  constructor(Server) {
    this.Server = Server;
    this.API = this.Server.API;
  }

  async createPost(userId, req, fileUrl) {
    console.log('service userid : ' + userId);
    const insertPost = await prisma.posts.create({
      data: {
        user_id: userId,
        content: req.content,
        file: fileUrl
      }
    });

    return insertPost;

  }

  async getPost() {
    const selectPost = await prisma.posts.findMany();

    if (!selectPost) return -1;

    return selectPost;
  }

  async getPostByUserId(userId) {
    const selectPost = await prisma.posts.findMany({
      where: {
        user_id: userId
      }
    });

    if (!selectPost) return -1;

    return selectPost;
  }

  async getPostById(postId) {
    const selectPost = await prisma.posts.findUnique({
      where: {
        id: postId
      }
    })

    if (!selectPost) return -1;

    return selectPost;
  }

  async editPost(req, postId) {
    const selectPost = await prisma.posts.findUnique({
      where: {
        id: postId
      }
    });

    if (!selectPost) return -1;

    con

    return;
  }
}

export default PostService;