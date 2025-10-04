import prisma from "../models/handler.model.js";

class PostService {
  constructor(Server) {
    this.Server = Server;
    this.API = this.Server.API;
  }

  async createPost(userId, req, fileUrl) {

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

  async editPost(req, postId, fileUrl, userId) {

    const updatePost = await prisma.posts.update({
      where: {
        id: postId,
        AND: [{
          user_id: userId
        }]

      },
      data: {
        content: req.content,
        file: fileUrl
      }
    });

    if (!updatePost) return -1

    return updatePost;
  }

  async deletePost(postId, userId) {

    const dropPost = await prisma.posts.delete({
      where: {
        id: postId,
        AND: [{
          user_id: userId
        }]
      }
    });

    return;
  }
}

export default PostService;