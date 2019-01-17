import { Option } from 'tsoption'

import CommandConfiguration from './command/CommandConfiguration'
import ConfiguredCommand from './command/ConfiguredCommand'
import ConsoleCommand from './command/ConsoleCommand'
import DefaultCommand from './command/DefaultCommand'
import {
  categorizeNamedArgs,
  categorizePositionArgs,
} from './helpers/categorizeArgs'
import { executeInitialize, executeInteract } from './helpers/executeLyfecycle'
import parseArgs, { ParsedNamedArgs } from './helpers/parseArgs'
import prepareNamedArgs from './helpers/prepareNamedArgs'
import preparePositionArgs from './helpers/preparePositionArgs'
import validateConfig from './helpers/validateConfig'
import ConsoleInput from './io/console/ConsoleInput'
import ConsoleOutput from './io/console/ConsoleOutput'

export default class ConsoleApplication {
  private readonly configuredCommand: { [name: string]: ConfiguredCommand } = {}
  private configured = false

  public constructor(private readonly commands: ConsoleCommand[]) {}

  public run = async (args: ReadonlyArray<string>) => {
    if (!this.configured) {
      await this.configure()
    }

    const { commandName, positionArgs, namedArgs } = parseArgs(args)

    const { command, configuration } = this.getCommand(commandName)
    await executeInteract(command)

    const input = this.getInput(configuration, positionArgs, namedArgs)
    const output = this.getOutput()

    await command.execute(input, output)
  }

  private configure = async () => {
    // call lifecycle method for all commands
    await Promise.all(this.commands.map(executeInitialize))

    this.commands.forEach(command => {
      const configuration = command.configure()

      validateConfig(configuration)

      this.configuredCommand[configuration.name] = {
        configuration,
        command,
      }
    })

    this.configured = true
  }

  private getCommand = (name: string): ConfiguredCommand =>
    Option.of(this.configuredCommand[name]).getOrElse(
      DefaultCommand.createdConfigured(),
    )

  private getInput = (
    config: CommandConfiguration,
    positionArgs: string[],
    namedArgs: ParsedNamedArgs,
  ) => {
    const preparedPositionArgs = preparePositionArgs(config, positionArgs)
    const preparedNamedArgs = prepareNamedArgs(config, namedArgs)

    const {
      required: requiredPosition,
      optional: optionalPosition,
    } = categorizePositionArgs(config, preparedPositionArgs)
    const {
      required: requiredNamed,
      optional: optionalNamed,
    } = categorizeNamedArgs(config, preparedNamedArgs)

    return new ConsoleInput(
      requiredPosition,
      optionalPosition,
      requiredNamed,
      optionalNamed,
    )
  }

  private getOutput = () => new ConsoleOutput()
}
