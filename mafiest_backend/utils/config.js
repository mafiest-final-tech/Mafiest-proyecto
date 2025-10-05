require('dotenv').config();

const config = {
  PORT: process.env.PORT || 3001,
  DATABASE_CONFIG: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  },
  SECRET: process.env.SECRET || 'tu_clave_secreta'
};

module.exports = config;
