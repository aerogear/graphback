const mongoPort = process.env.MONGO_PORT || '27017';
export const MONGO_DB_URL = `mongodb://mongodb:mongo@localhost:${mongoPort}/users?authSource=admin`;