export const CREATE_USER = `
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            user {
            cpf
            name
            mail
            }
            errors
        }
    }
`;
