export interface ICRUDModelCreator<T> {
  findAll(): Promise<T[]>,
}
