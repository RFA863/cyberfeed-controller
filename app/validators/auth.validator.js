class AuthValidator {
  input = {
    type: "object",
    properties: {
      username: {
        type: "string",
        maxLength: 50,
        minLength: 3,
      },

      password: {
        type: "string",
        maxLength: 16,
        minLength: 8
      }
    },

    required: ["username", "password"],
    additionalProperties: false
  };
}

export default AuthValidator