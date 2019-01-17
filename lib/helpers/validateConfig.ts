import CommandConfiguration from '../command/CommandConfiguration'
import { getNormalizedNamedArgsConfig } from './prepareNamedArgs'
import { getNormalizedPositionArgsConfig } from './preparePositionArgs'

export class InvalidConfigException extends Error {}

const checkDuplicates = (commandName: string) => (field: string) => <T>(
  arr: T[],
  attr: string,
) => {
  const variants = arr.filter(Boolean)

  if (variants.length !== [...new Set(variants)].length) {
    throw new InvalidConfigException(
      `[${commandName}] Duplicate ${attr} in ${field}`,
    )
  }
}

const validatePositionArgs = (config: CommandConfiguration) => {
  const check = checkDuplicates(config.name)('position arguments')

  const preparedPositionArgs = getNormalizedPositionArgsConfig(config)

  const positions = preparedPositionArgs.map(({ position }) => position)
  check(positions, 'positions')
}

const validateNamedArgs = (config: CommandConfiguration) => {
  const check = checkDuplicates(config.name)('named arguments')

  const preparedNamedArgs = getNormalizedNamedArgsConfig(config)

  const names = preparedNamedArgs.map(({ name }) => name)
  check(names, 'names')

  const shortcuts = preparedNamedArgs.map(({ shortcut }) => shortcut)
  check(shortcuts, 'shortcuts')
}

export default (config: CommandConfiguration) => {
  validatePositionArgs(config)
  validateNamedArgs(config)

  return true
}
