// config/dotenv.config.js
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Optionally, export the configuration if you want to centralize your config values
const config = {
  PORT: process.env.PORT || 5000,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  // Add other config variables as needed
  EMAIL_USER : process.env.EMAIL_USER,
  EMAIL_PASS : process.env.EMAIL_PASS,
  
};

export default config;
