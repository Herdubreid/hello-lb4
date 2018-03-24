import { inject } from '@loopback/core';
import { DefaultCrudRepository, DataSourceType } from '@loopback/repository';
import { Todo } from '../models';

export class TodoRepository extends DefaultCrudRepository<
    Todo,
    typeof Todo.prototype.id> {
    constructor(
        @inject('datasources.db') protected datasource: DataSourceType
    ) {
        super(Todo, datasource);
    }
}
