import { Exception } from '../models/exceptions/Exception'

const NS_PER_SEC = 1e9
const MS_PER_NS = 1e6

type Function = () => Promise<any>
type Chronometer = (millis: number, operation: string) => Promise<void>

export function getProbabilisticChronometer(p: number, chron: Chronometer): Chronometer {
  if (p < 0 || p > 1) throw new Exception("'p' must be in the [0,1] range")
  return async (millis: number, operation: string) => {
    if (Math.random() < p) await chron(millis, operation)
  }
}

export async function timeIt(func: Function, chron: Chronometer, operation: string) {
  const time = process.hrtime()
  const ans = await func()
  const millis = hrtimeToMillis(process.hrtime(time))
  // Not awaiting, since we are not interested in getting a result back
  chron(millis, operation)
  return ans
}

function hrtimeToMillis(diff: [number, number]) {
  const nanoSeconds = diff[0] * NS_PER_SEC + diff[1]
  return nanoSeconds / MS_PER_NS
}
