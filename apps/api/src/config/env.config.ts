
// funcion para extraer y ponerlos en el configModule de app.module
export const EnvConfiguration = () => ({
    // DB
    DB_HOST: process.env.DB_HOST,
    DB_DB: process.env.DB_DB,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,

    // SECURITY
    SECRET_KEY:process.env.SECRET_KEY,
    API_KEY:process.env.API_KEY,
    GENERATOR_PHRASE:process.env.GENERATOR_PHRASE,
});

