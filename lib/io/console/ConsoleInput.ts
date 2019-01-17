import { Option } from 'tsoption'

import { PreparedNamedArgs } from '../../helpers/prepareNamedArgs'
import { PreparedPositionArgs } from '../../helpers/preparePositionArgs'
import ArgumentNotFoundException from '../ArgumentNotFoundException'
import Input from '../Input'

export default class ConsoleInput implements Input {
  public constructor(
    private readonly requiredPositionArgs: PreparedPositionArgs,
    private readonly optionPositionArgs: PreparedPositionArgs,
    private readonly requiredNamedArgs: PreparedNamedArgs,
    private readonly optionNamedArgs: PreparedNamedArgs,
  ) {}

  public getPositionArg = (name: string) =>
    this.getOrThrow(
      this.requiredPositionArgs[name],
      `Position argument "${name} not found`,
    )
  public getNamedArg = (name: string) =>
    this.getOrThrow(
      this.requiredNamedArgs[name],
      `Named argument "${name} not found`,
    )

  public getOptionalPositionArg = (name: string) =>
    Option.of(this.optionPositionArgs[name])
  public getOptionalNamedArg = (name: string) =>
    Option.of(this.optionNamedArgs[name])

  private getOrThrow = (
    value: string | undefined,
    errorMessage: string,
  ): string => {
    if (typeof value === 'undefined') {
      throw new ArgumentNotFoundException(errorMessage)
    }

    return value
  }
}
