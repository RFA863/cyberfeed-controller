import Ajv from 'ajv';

import PostService from '../services/post.service.js';
import ResponsePreset from '../helpers/responsePreset.helper.js'
import PostValidator from '../validators/post.validator.js';

class PostController {
  constructor(Server) {
    this.Server = Server;
    this.API = this.Server.API;
    this.ajv = new Ajv();

    this.PostValidator = new PostValidator();
    this.ResponsePreset = new ResponsePreset();
    this.PostService = new PostService(this.Server);
  }

  async createPost(req, res) {

    const schemaValidate = this.ajv.compile(this.PostValidator.input)

    if (!schemaValidate(req.body))
      return res.status(400).json(this.ResponsePreset.resErr(
        400, schemaValidate.errors[0].message, 'validator, ', schemaValidate.errors[0]
      ));

    const data = req.body;
    const file = req.file;
    const { userid } = req.middlewares.authorization;

    const postSrv = await this.PostService.createPost(userid, data, file);

    return res.status(200).json(this.ResponsePreset.resOK('Success', postSrv));
  }

  async getPost(req, res) {
    const postSrv = await this.PostService.getPost();

    if (postSrv === -1)
      return res.status(404).json(this.ResponsePreset.resErr(
        404, 'No Post', 'service', { code: -1 }
      ));

    return res.status(200).json(this.ResponsePreset.resOK('Success', postSrv));
  }

  async getPostByUserId(req, res) {

    const { userid } = req.middlewares.authorization;

    const postSrv = await this.PostService.getPostByUserId(userid);

    if (postSrv === -1)
      return res.status(404).json(this.ResponsePreset.resErr(
        404, 'No Post', 'service', { code: -1 }
      ));

    return res.status(200).json(this.ResponsePreset.resOK('Success', postSrv));
  }

  async getPostById(req, res) {
    const { postId } = req.params;

    const postSrv = await this.PostService.getPostById(postId);

    if (postSrv === -1)
      return res.status(404).json(this.ResponsePreset.resErr(
        404, 'Post not found', 'service', { code: -1 }
      ));

    return res.status(200).json(this.ResponsePreset.resOK('Success', postSrv));
  }

  async editPost(req, res) {

    const schemaValidate = this.ajv.compile(this.PostValidator.input)

    if (!schemaValidate(req.body))
      return res.status(400).json(this.ResponsePreset.resErr(
        400, schemaValidate.errors[0].message, 'validator, ', schemaValidate.errors[0]
      ));

    const { userid } = req.middlewares.authorization;
    const data = req.body;
    const file = req.file;
    const { postId } = req.params;


    const postSrv = await this.PostService.editPost(data, postId, file, userid);

    if (postSrv === -1)
      return res.status(404).json(this.ResponsePreset.resErr(
        404, 'Post not found', 'service', { code: -1 }
      ));

    if (postSrv === -2)
      return res.status(404).json(this.ResponsePreset.resErr(
        403, 'Frbiden, user_id not same', 'service', { code: -2 }
      ));

    return res.status(200).json(this.ResponsePreset.resOK('Success', postSrv));

  }

  async deletePost(req, res) {
    const { userid } = req.middlewares.authorization;
    const { postId } = req.params;

    const postSrv = await this.PostService.deletePost(postId, userid)

    if (postSrv === -1)
      return res.status(404).json(this.ResponsePreset.resErr(
        404, 'Post not found', 'service', { code: -1 }
      ));

    if (postSrv === -2)
      return res.status(404).json(this.ResponsePreset.resErr(
        403, 'Frbiden, user_id not same', 'service', { code: -2 }
      ));

    return res.status(200).json(this.ResponsePreset.resOK('Success', postSrv));
  }
}

export default PostController