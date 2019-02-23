import CommandConfiguration from '../command/CommandConfiguration'
import NamedArgument from '../command/input/NamedArgument'
import { ParsedNamedArgs } from './parseArgs'

export class InvalidNamedArgsException extends Error {}

export interface PreparedNamedArgs {
  [key: string]: string
}

export const getNormalizedNamedArgsConfig = (
  config: CommandConfiguration,
): NamedArgument[] =>
  (config.namedArgs || []).map(argConfig => {
    if (typeof argConfig === 'string') {
      return {
        name: argConfig,
      }
    }

    return argConfig
  })

const prepareExists = (argsConfig: NamedArgument[], args: ParsedNamedArgs) => {
  const namedPreparedArgs = {}

  Object.entries(args).forEach(([key, value]) => {
    const argConfig = argsConfig.find(({ name, shortcut }) =>
      [name, shortcut].includes(key),
    )

    if (argConfig) {
      namedPreparedArgs[argConfig.name] = value
    }
  })

  return namedPreparedArgs
}

const prepareNotFound = (
  argsConfig: NamedArgument[],
  found: PreparedNamedArgs,
) => {
  const namedPreparedArgs = {
    ...found,
  }

  const actuallyArgsKeys = Object.keys(namedPreparedArgs)

  argsConfig
    .filter(({ name }) => !actuallyArgsKeys.includes(name))
    .forEach(argConfig => {
      if (argConfig.required && !argConfig.default) {
        throw new InvalidNamedArgsException(
          `Required "${
            argConfig.name
          }" does not provided and has not default value`,
        )
      }

      if (argConfig.default) {
        namedPreparedArgs[argConfig.name] = argConfig.default
      }
    })

  return namedPreparedArgs
}

export default (config: CommandConfiguration, namedArgs: ParsedNamedArgs) => {
  const namedArgsConfig = getNormalizedNamedArgsConfig(config)
  const namedPreparedArgs = prepareExists(namedArgsConfig, namedArgs)
  const completeArgs = prepareNotFound(namedArgsConfig, namedPreparedArgs)

  return completeArgs
}
