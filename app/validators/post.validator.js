class PostValidator {
  input = {
    type: 'object',
    properties: {
      content: {
        type: 'String',
        maxLength: 200,
        minLength: 1
      }
    },
    required: ['content'],
    additionalProperties: false
  };
}

export default PostValidator;