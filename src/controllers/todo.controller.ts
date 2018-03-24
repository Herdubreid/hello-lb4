import { repository } from '@loopback/repository';
import {
    HttpErrors,
    requestBody,
    param,
    post,
    get,
    put,
    patch,
    del
} from '@loopback/rest';
import { TodoRepository } from '../repositories';
import { Todo } from '../models';

export class TodoController {
    @post('/todo')
    async createTodo(@requestBody() todo: Todo) {
        if (!todo.title) {
            return Promise.reject(new HttpErrors.BadRequest('title is required!'));
        }
        return await this.todoRepo.create(todo);
    }
    @get('/todo/{id}')
    async findTodoById(@param.path.number('id') id: number): Promise<Todo> {
        return await this.todoRepo.findById(id);
    }
    @get('/todo')
    async findTodos(): Promise<Todo[]> {
        return await this.todoRepo.find();
    }
    @put('/todo/{id}')
    async replaceTodo(
        @param.path.number('id') id: number,
        @requestBody() todo: Todo
    ): Promise<boolean> {
        // REST does not coerce parameter values coming from string sources
        // like path & query, so we cast the number ourself
        id = +id;
        return await this.todoRepo.replaceById(id, todo);
    }
    @patch('/todo/{id}')
    async updateTodo(
        @param.path.number('id') id: number,
        @requestBody() todo: Todo
    ): Promise<boolean> {
        id = +id;
        return await this.todoRepo.updateById(id, todo);
    }
    @del('/todo/{id}')
    async deleteTodo(
        @param.path.number('id') id: number,
        @requestBody() todo: Todo
    ): Promise<boolean> {
        return await this.todoRepo.deleteById(id);
    }
    constructor(
        @repository(TodoRepository.name) protected todoRepo: TodoRepository
    ) { }
}
