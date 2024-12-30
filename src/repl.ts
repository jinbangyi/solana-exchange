import { repl } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function main() {
  const replServer = await repl(AppModule);
  replServer.setupHistory('.nestjs_repl_history', (err) => {
    if (err) {
      console.error(err);
    }
  });
}

main();
