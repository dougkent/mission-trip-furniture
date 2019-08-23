export const signUpConfig = {
    hideAllDefaults: true,
    signUpFields: [
        {
            label: 'Email',
            key: 'email',
            required: true,
            displayOrder: 1,
            type: 'string',
        },

        {
            label: 'Name',
            key: 'name',
            required: true,
            displayOrder: 2,
            type: 'string',
        },
        {
            label: 'Username',
            key: 'username',
            required: true,
            displayOrder: 3,
            type: 'string',
        },
        {
            label: 'Password',
            key: 'password',
            required: true,
            displayOrder: 4,
            type: 'password',
        }
    ]
};