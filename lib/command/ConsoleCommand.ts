import Input from '../io/Input'
import Output from '../io/Output'
import CommandConfiguration from './CommandConfiguration'

export default interface ConsoleCommand {
  configure: () => CommandConfiguration

  // Command Lifecycle
  initialize?: () => Promise<void> | void
  interact?: () => Promise<void> | void
  execute: (input: Input, output: Output) => Promise<any>
}
