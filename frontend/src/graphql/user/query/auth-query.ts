export const AUTH_QUERY = `
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      token
      errors
    }
  }
`;
