export interface ICRUDModelCreator<T> {
  create(data: Partial<T>): Promise<T>,
}
