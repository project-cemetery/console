import Input from '../io/Input'
import Output from '../io/Output'
import CommandConfiguration from './CommandConfiguration'
import ConfiguredCommand from './ConfiguredCommand'
import ConsoleCommand from './ConsoleCommand'

export const DEFAULT_COMMAND = '@solid-soda/default-command'

export default class DefaultCommand implements ConsoleCommand {
  public static createdConfigured(): ConfiguredCommand {
    const command = new DefaultCommand()

    return {
      configuration: command.configure(),
      command,
    }
  }

  public configure = (): CommandConfiguration => ({
    name: DEFAULT_COMMAND,
  })

  public execute = async (input: Input, output: Output) => {
    await output.info('info')
    await output.error('error')
    await output.success('success')
    await output.warning('warning')
  }
}
