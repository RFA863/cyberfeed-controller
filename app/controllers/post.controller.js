import Ajv from 'ajv';

import PostService from '../services/post.service.js';
import UploadFromBuffer from '../helpers/cloudinary.helpers.js'
import ResponsePreset from '../helpers/responsePreset.helper.js'

class PostController {
  constructor(Server) {
    this.Server = Server;
    this.API = this.Server.API;
    this.ajv = new Ajv();

    this.ResponsePreset = new ResponsePreset();
    this.PostService = new PostService(this.Server);
  }

  async createPost(req, res) {
    const data = req.body;
    const file = req.file;
    const userId = req.middlewares.authorization;
    console.log(userId);
    if (!data.content && !file) {
      return res.status(400).json(this.ResponsePreset.resErr(400, "Postingan harus memiliki konten atau file."));
    }

    let fileUrl = null;


    if (file) {
      const result = await UploadFromBuffer(file.buffer);
      fileUrl = result.secure_url;
    }

    const postSrv = await this.PostService.createPost(userId.userid, data, fileUrl);

    return res.status(200).json(this.ResponsePreset.resOK('Success', postSrv));
  }
}

export default PostController