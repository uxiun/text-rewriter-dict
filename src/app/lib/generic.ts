export const partialUpdateObject = <T>(o: T, partial: Partial<T>): T => ({...o, ...partial})

export const subtypePartial = <T,U>(union: Partial<T>) => {

}