import { Resolver, Query, Float, Int, Args } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    description: 'Hola Mundo es lo que retorna',
    name: 'hello',
  })
  helloWorld(): string {
    return 'Hola Mundo';
  }

  @Query( () => Float, { name: 'RandomNumber'})
  getRandomNumber():number {
    return Math.random() * 100;
  }

  @Query( () => Int, { name: 'RandomNumberFromZeroTo', description:'From zero to argument TO'})
  getRandomFromZero(
    @Args('to', { type: () => Int, nullable:true}) to: number = 5
  ):number {
    return Math.floor(Math.random() * to);
  }

}
