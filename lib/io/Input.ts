import { Option } from 'tsoption'

export default interface Input {
  getPositionArg(name: string): string
  getNamedArg(name: string): string

  getOptionalPositionArg(name: string): Option<string>
  getOptionalNamedArg(name: string): Option<string>
}
