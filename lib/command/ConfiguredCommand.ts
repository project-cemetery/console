import CommandConfiguration from './CommandConfiguration'
import ConsoleCommand from './ConsoleCommand'

export default interface ConfiguredCommand {
  configuration: CommandConfiguration
  command: ConsoleCommand
}
