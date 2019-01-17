import * as yargs from 'yargs'

interface RawNamedArgs {
  [key: string]: unknown
}

export interface ParsedNamedArgs {
  [key: string]: string | boolean
}

interface ParsedArgs {
  commandName: string
  positionArgs: string[]
  namedArgs: ParsedNamedArgs
}

const parseNamedArgs = (args: RawNamedArgs): ParsedNamedArgs => {
  const parsedArgs: ParsedNamedArgs = {}

  Object.entries(args).forEach(([key, value]) => {
    if (typeof value === 'string') {
      parsedArgs[key] = value
    }

    if (typeof value === 'boolean') {
      parsedArgs[key] = value
    }

    return
  })

  return parsedArgs
}

export default (args: ReadonlyArray<string>): ParsedArgs => {
  const parsedArgs = yargs(args).argv

  const {
    _: [commandName, ...positionArgs],
    ...namedArgs
  } = parsedArgs

  return {
    commandName,
    positionArgs,
    namedArgs: parseNamedArgs(namedArgs),
  }
}
