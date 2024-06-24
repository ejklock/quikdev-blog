import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  return {
    port: parseInt(process.env.APP_PORT, 10) || 3333,
    jwtSecret: process.env.JWT_SECRET || 'secret',
    jwtExpire: parseInt(process.env.JWT_EXPIRE, 10) || 86400000,
  };
});
