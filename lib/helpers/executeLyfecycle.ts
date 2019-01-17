import ConsoleCommand from '../command/ConsoleCommand'

export const executeInitialize = async (command: ConsoleCommand) => {
  if (!command.initialize) {
    return
  }

  return command.initialize()
}

export const executeInteract = async (command: ConsoleCommand) => {
  if (!command.interact) {
    return
  }

  return command.interact()
}
