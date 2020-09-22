/** Flattens the given list
 */
export function flattenList(flat: any[], chunk: any[]) {
  return flat.concat(chunk)
}

/** Returns the list without duplicates
 */
export function distincts(distincts: any[], value: any) {
  if (!distincts.includes(value)) distincts.push(value)
  return distincts
}

export type Counter = {
  [key: string]: number
}

export function distinctCounter(counters: Counter, value: string) {
  if (!counters[value]) {
    counters[value] = 0
  }

  counters[value]++

  return counters
}
