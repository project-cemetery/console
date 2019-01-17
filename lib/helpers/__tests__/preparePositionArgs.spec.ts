import CommandConfiguration from '../../command/CommandConfiguration'

import preparePositionArgs, {
  InvalidPositionArgsException,
} from '../preparePositionArgs'

describe('preparePositionArgs', () => {
  const baseCondig: CommandConfiguration = {
    name: 'fake-config',
  }

  test('should return empty object for empty config and empty input', () => {
    const args = preparePositionArgs(baseCondig, [])

    expect(args).toEqual({})
  })

  test('should return empty object for empty config and any input', () => {
    const args = preparePositionArgs(baseCondig, ['hello', 'world'])

    expect(args).toEqual({})
  })

  test('should return correct args if config to match input', () => {
    const args = preparePositionArgs(
      {
        ...baseCondig,
        positionArgs: [
          {
            name: 'message',
            position: 0,
          },
          {
            name: 'name',
            position: 1,
          },
        ],
      },
      ['hello', 'world'],
    )

    expect(args).toEqual({
      message: 'hello',
      name: 'world',
    })
  })

  test('shoult return correct args if cminimal config to match input', () => {
    const args = preparePositionArgs(
      {
        ...baseCondig,
        positionArgs: ['message', 'name'],
      },
      ['hello', 'world'],
    )

    expect(args).toEqual({
      message: 'hello',
      name: 'world',
    })
  })

  test('should add notfound args from default values', () => {
    const args = preparePositionArgs(
      {
        ...baseCondig,
        positionArgs: [
          {
            name: 'message',
            position: 0,
          },
          {
            name: 'name',
            position: 1,
            default: 'world',
          },
        ],
      },
      ['hello'],
    )

    expect(args).toEqual({
      message: 'hello',
      name: 'world',
    })
  })

  test('should throw error if reqired arg does not provided', () => {
    expect(() =>
      preparePositionArgs(
        {
          ...baseCondig,
          positionArgs: [
            {
              name: 'message',
              position: 0,
            },
            {
              name: 'name',
              position: 1,
              required: true,
            },
          ],
        },
        ['hello'],
      ),
    ).toThrow(InvalidPositionArgsException)
  })
})
