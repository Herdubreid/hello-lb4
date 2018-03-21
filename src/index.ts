import {HelloLb4Application} from './application';
import {ApplicationConfig} from '@loopback/core';

export {HelloLb4Application};

export async function main(options?: ApplicationConfig) {
  const app = new HelloLb4Application(options);

  try {
    await app.boot();
    await app.start();
  } catch (err) {
    console.error(`Unable to start application: ${err}`);
  }
  return app;
}
