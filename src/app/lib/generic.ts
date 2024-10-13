export const partialUpdateObject = <T>(o: T, partial: Partial<T>): T => ({...o, ...partial})
