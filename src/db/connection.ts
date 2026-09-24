import { Pool,Client } from 'pg';

const pool = new Pool
({
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    database:process.env.DB_NAME
});

export default pool;
// pool.query('SELECT NOW()')
//     .then(res => {
//         console.log('connected')
//         pool.end
//     })
//     .catch(err => {
//         console.error(err)
//     })