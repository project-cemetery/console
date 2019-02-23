import CommandConfiguration from '../command/CommandConfiguration'
import PositionArgument from '../command/input/PositionArgument'

export class InvalidPositionArgsException extends Error {}

export interface PreparedPositionArgs {
  [key: string]: string
}

export const getNormalizedPositionArgsConfig = (
  config: CommandConfiguration,
): PositionArgument[] =>
  (config.positionArgs || []).map((argConfig, i) => {
    if (typeof argConfig === 'string') {
      return {
        name: argConfig,
        position: i,
      }
    }

    return {
      ...argConfig,
      position: argConfig.position || i,
    }
  })

const prepareExists = (argsConfig: PositionArgument[], args: string[]) => {
  const positionPreparedArgs = {}

  args.forEach((value, i) => {
    const argConfig = argsConfig.find(({ position }) => position === i)

    if (argConfig) {
      positionPreparedArgs[argConfig.name] = value
    }
  })

  return positionPreparedArgs
}

const prepareNotFound = (
  argsConfig: PositionArgument[],
  found: PreparedPositionArgs,
) => {
  const positionPreparedArgs = {
    ...found,
  }

  const actuallyArgsCount = Object.keys(positionPreparedArgs).length

  argsConfig
    .filter(({ position }) => position >= actuallyArgsCount)
    .forEach(argConfig => {
      if (argConfig.required && !argConfig.default) {
        throw new InvalidPositionArgsException(
          `Required "${
            argConfig.name
          }" does not provided and has not default value`,
        )
      }

      if (argConfig.default) {
        positionPreparedArgs[argConfig.name] = argConfig.default
      }
    })

  return positionPreparedArgs
}

export default (config: CommandConfiguration, positionArgs: string[]) => {
  const positionArgsConfig = getNormalizedPositionArgsConfig(config)
  const positionPreparedArgs = prepareExists(positionArgsConfig, positionArgs)
  const completeArgs = prepareNotFound(positionArgsConfig, positionPreparedArgs)

  return completeArgs
}
