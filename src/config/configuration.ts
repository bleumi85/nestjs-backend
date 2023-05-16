export const configuration = () => ({
    node_env: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10),
});
