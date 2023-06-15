// eslint-disable-next-line @typescript-eslint/no-unused-vars

export type NewEntity<IMatche> = Omit<IMatche, 'id'>;

export type ID = number;

export type Identifiable = { id: ID };
