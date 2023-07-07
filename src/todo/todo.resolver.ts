import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';
import { StatusArgs } from './dto/args/status.args';
import { AggregationType } from './types/aggregation.type';

@Resolver( () => Todo )
export class TodoResolver {

    constructor(
        private readonly todoService: TodoService,
    ) {}

    @Query(() => [Todo], { name: 'todos' })
    findAll( @Args() statusArgs: StatusArgs ):Todo[] {
        return this.todoService.findAll(statusArgs);
    }

    @Query(() => Todo, { name: 'todo' })
    findOne(
        @Args('id', { type: () => Int, nullable:true }) id: number
    ) {
        return this.todoService.findOne(id);
    }

    @Mutation(() => Todo, { name: 'createTodo' })
    createTodo(
        @Args('createTodoInput') CreateTodoInput: CreateTodoInput
    ) {
        return this.todoService.create( CreateTodoInput );
    }

    @Mutation(() => Todo, { name: 'updateTodo' })
    updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
        return this.todoService.update( updateTodoInput);
    }

    @Mutation(() => Boolean, { name: 'deleteTodo' })
    removeTodo(@Args('id', { type: () => Int }) id: number): Boolean {
        return this.todoService.delete( id );
    }

    @Query( () => Int, {name: 'totalTodos'})
    totalTodos(): number {
        return this.todoService.totalTodos;
    }

    @Query( () => Int, {name: 'completedTodos'})
    completedTodos(): number {
        return this.todoService.completedTodos;
    }

    @Query( () => Int, {name: 'pendingTodos'})
    pendingTodo(): number {
        return this.todoService.pendingTodos;
    }

    @Query( () => AggregationType)
    aggregations(): AggregationType {
        return {
            completed: this.todoService.completedTodos,
            pending: this.todoService.pendingTodos,
            total: this.todoService.totalTodos,
            totalTodoCompeted: this.todoService.completedTodos
        }
    }
}
