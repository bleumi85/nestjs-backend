export const configuration = () => ({
    node_env: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10),
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
});
