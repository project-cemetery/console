// `lodash.{function}` types broken, DON'T use it
import * as omit from 'lodash.omit'
import * as pick from 'lodash.pick'

import CommandConfiguration from '../command/CommandConfiguration'
import {
  getNormalizedNamedArgsConfig,
  PreparedNamedArgs,
} from './prepareNamedArgs'
import {
  getNormalizedPositionArgsConfig,
  PreparedPositionArgs,
} from './preparePositionArgs'

export const categorizeNamedArgs = (
  config: CommandConfiguration,
  args: PreparedNamedArgs,
) => categorizeArgs(args, getNormalizedNamedArgsConfig(config))

export const categorizePositionArgs = (
  config: CommandConfiguration,
  args: PreparedPositionArgs,
) => categorizeArgs(args, getNormalizedPositionArgsConfig(config))

interface ArgConfig {
  required?: boolean
  name: string
}

const categorizeArgs = <TArgs extends object, TConfig extends ArgConfig[]>(
  args: TArgs,
  argsConfig: TConfig,
) => {
  const optionalArgs = argsConfig
    .filter(argConfig => !argConfig.required)
    .map(argConfig => argConfig.name)

  return {
    optional: pick(args, optionalArgs) as TArgs,
    required: omit(args, optionalArgs) as TArgs,
  }
}
