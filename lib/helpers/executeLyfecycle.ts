import ConsoleCommand from '../command/ConsoleCommand'

export const executeInitialize = async (command: ConsoleCommand) => {
  if (!command.initialize) {
    return
  }

  await Promise.resolve(command.initialize())
}

export const executeInteract = async (command: ConsoleCommand) => {
  if (!command.interact) {
    return
  }

  await Promise.resolve(command.interact())
}
