const users = [
    {
        user: 'user',
        password: 'pass',
        role: 'admin',
        token: 'user'
    },
];

export function verifyUser(username, password) {
    const userFound = users.find(u => u.user === username && u.password === password);

    return userFound ? {
        role: userFound.role,
        token: userFound.token
    } : null;
}
