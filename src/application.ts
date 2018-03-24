import { ApplicationConfig } from '@loopback/core';
import { RestApplication, RestServer } from '@loopback/rest';

/* tslint:disable:no-unused-variable */
// Binding and Booter imports are required to infer types for BootMixin!
import { BootMixin, Booter, Binding } from '@loopback/boot';
// juggler and DataSourceConstructor import are required to infer types for RepositorMixins!
import {
  Class,
  Repository,
  RepositoryMixin,
  juggler,
  DataSourceConstructor
} from '@loopback/repository';
/* tslint:enable:no-unused-variable */

import { MySequence } from './sequence';
import { db } from './datasources/db.datasource';

export class HelloLb4Application extends BootMixin(
  RepositoryMixin(RestApplication)
) {
  async start() {
    await super.start();

    const server = await this.getServer(RestServer);
    const port = await server.get('rest.port');
    console.log(`Server is running at http://127.0.0.1:${port}`);
    console.log(`Try http://127.0.0.1:${port}/ping`);
  }
  setupDataSources() {
    // This will allow you to test your application without needing to
    // use a "real" datasource!
    const datasource =
      this.options && this.options.datasource
        ? new DataSourceConstructor(this.options.datasource)
        : db;
    this.dataSource(datasource);
  }
  constructor(options?: ApplicationConfig) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    this.setupDataSources();
  }
}
