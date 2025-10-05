import prisma from "../models/handler.model.js";
import { UploadFromBuffer, getPublicIdFromUrl, deleteFromCloudinary } from '../helpers/cloudinary.helpers.js';

class PostService {
  constructor(Server) {
    this.Server = Server;
    this.API = this.Server.API;
  }

  async createPost(userId, req, file) {

    const dataCreatePost = {
      user_id: userId,
      content: req.content
    }

    if (file) {
      const result = await UploadFromBuffer(file.buffer);
      dataCreatePost.file = result.secure_url;
    }

    const insertPost = await prisma.posts.create({
      data: dataCreatePost
    });

    return insertPost;

  }

  async getPost() {
    const selectPost = await prisma.posts.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true
          }
        },
      }, orderBy: {
        updated_at: 'desc'
      }
    });

    if (selectPost.length === 0) return -1;

    return selectPost;
  }

  async getPostByUserId(userId) {
    const selectPost = await prisma.posts.findMany({
      where: {
        user_id: userId
      },
      include: {
        user: {
          select: {
            id: true,
            username: true
          }
        },
      }, orderBy: {
        updated_at: 'desc'
      }
    });

    if (selectPost.length === 0) return -1;

    return selectPost;
  }

  async getPostById(postId) {

    const id = parseInt(postId);

    const selectPost = await prisma.posts.findUnique({
      where: {
        id: id
      },
      include: {
        user: {
          select: {
            id: true,
            username: true
          }
        },
      }
    })

    if (selectPost.length === 0) return -1;

    return selectPost;
  }

  async editPost(req, postId, file, userId) {

    const id = parseInt(postId);

    let fileUrl;

    const findPost = await prisma.posts.findUnique({
      where: { id: id }
    });

    if (!findPost) return -1;
    if (findPost.user_id !== userId) return -2;

    const dataEditPost = {
      content: req.content
    };

    if (file) {
      const result = await UploadFromBuffer(file.buffer);
      fileUrl = result.secure_url;
    };

    if (fileUrl) {
      if (findPost.file) {
        const oldPublicId = getPublicIdFromUrl(findPost.file);
        if (oldPublicId) {
          await deleteFromCloudinary(oldPublicId).catch(err => console.error("Gagal menghapus file lama:", err));
        }
      }
      dataEditPost.file = fileUrl;
    };

    const updatePost = await prisma.posts.update({
      where: { id: id },
      data: dataEditPost,
      include: {
        user: {
          select: { id: true, username: true }
        }
      }
    });

    return updatePost;
  }

  async deletePost(postId, userId) {

    const id = parseInt(postId);

    const findPost = await prisma.posts.findUnique({
      where: { id: id }
    });

    if (!findPost) return -1;
    if (findPost.user_id !== userId) return -2;

    if (findPost.file) {
      const publicId = getPublicIdFromUrl(findPost.file);
      if (publicId) {
        await deleteFromCloudinary(publicId).catch(err => console.error("Gagal menghapus file dari Cloudinary:", err));
      }
    }

    await prisma.posts.delete({ where: { id: id } });

    return { message: "Post deleted successfully" };

    return;
  }
}

export default PostService;