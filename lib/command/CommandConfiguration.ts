import NamedArgument from './input/NamedArgument'
import PositionArgument from './input/PositionArgument'

export default interface CommandConfiguration {
  name: string
  description?: string
  positionArgs?: Array<PositionArgument | string>
  namedArgs?: Array<NamedArgument | string>
}
