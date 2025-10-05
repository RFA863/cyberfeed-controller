class PostValidator {
  input = {
    type: "object",
    properties: {
      content: {
        type: "string",
        maxLength: 200,
        minLength: 1
      }
    },
    required: ["content"],
    additionalProperties: false
  };
}

export default PostValidator;