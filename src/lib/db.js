import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "escoladb",
    password: "90098228",
    port:5432,
});

export default pool;