import { RUN_ENV } from "./constants";

if (!RUN_ENV) {
  throw new Error('RUN_ENV is not set');
}

// log the config
console.log('ENV', {
  RUN_ENV
});
