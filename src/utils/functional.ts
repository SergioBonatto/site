/**
 * Functional programming utilities
 */

/**
 * Pipe function - applies functions from left to right
 * @param value Initial value
 * @param fns Functions to apply in sequence
 * @returns Result after applying all functions
 */
export function pipe<A, B>(value: A, fn1: (arg: A) => B): B;
export function pipe<A, B, C>(value: A, fn1: (arg: A) => B, fn2: (arg: B) => C): C;
export function pipe<A, B, C, D>(value: A, fn1: (arg: A) => B, fn2: (arg: B) => C, fn3: (arg: C) => D): D;
export function pipe<A, B, C, D, E>(value: A, fn1: (arg: A) => B, fn2: (arg: B) => C, fn3: (arg: C) => D, fn4: (arg: D) => E): E;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function pipe(value: any, ...fns: Array<(arg: any) => any>): any {
  return fns.reduce((acc, fn) => fn(acc), value);
}

/**
 * Compose function - applies functions from right to left
 * @param fns Functions to compose
 * @returns Composed function
 */
export function compose<A, B>(fn1: (arg: A) => B): (value: A) => B;
export function compose<A, B, C>(fn2: (arg: B) => C, fn1: (arg: A) => B): (value: A) => C;
export function compose<A, B, C, D>(fn3: (arg: C) => D, fn2: (arg: B) => C, fn1: (arg: A) => B): (value: A) => D;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function compose(...fns: Array<(arg: any) => any>): (value: any) => any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (value: any) => fns.reduceRight((acc, fn) => fn(acc), value);
}

/**
 * Curry function - transforms a function with multiple arguments into a sequence of functions
 * @param fn Function to curry
 * @returns Curried function
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const curry = <T extends any[], R>(fn: (...args: T) => R): any => {
  return (...args: any[]): any => {
    return args.length >= fn.length
      ? fn(...(args as T))
      : curry(fn.bind(null, ...(args as any[])));
  };
};
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Identity function - returns the input unchanged
 * @param x Input value
 * @returns Same value
 */
export const identity = <T>(x: T): T => x;

/**
 * Constant function - returns a function that always returns the same value
 * @param x Value to return
 * @returns Function that returns x
 */
export const constant =
  <T>(x: T) =>
  (): T =>
    x;

/**
 * Maybe monad for handling nullable values
 */
export class Maybe<T> {
  private constructor(private value: T | null | undefined) {}

  static of<T>(value: T | null | undefined): Maybe<T> {
    return new Maybe(value);
  }

  isNothing(): boolean {
    return this.value === null || this.value === undefined;
  }

  map<U>(fn: (value: T) => U): Maybe<U> {
    return this.isNothing() ? Maybe.of<U>(null) : Maybe.of(fn(this.value!));
  }

  flatMap<U>(fn: (value: T) => Maybe<U>): Maybe<U> {
    return this.isNothing() ? Maybe.of<U>(null) : fn(this.value!);
  }

  getOrElse(defaultValue: T): T {
    return this.isNothing() ? defaultValue : this.value!;
  }

  filter(predicate: (value: T) => boolean): Maybe<T> {
    return this.isNothing() || !predicate(this.value!)
      ? Maybe.of<T>(null)
      : this;
  }
}
