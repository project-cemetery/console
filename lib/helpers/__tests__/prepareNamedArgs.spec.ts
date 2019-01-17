import CommandConfiguration from '../../command/CommandConfiguration'

import prepareNamedArgs, {
  InvalidNamedArgsException,
} from '../prepareNamedArgs'

describe('prepareNamedArgs', () => {
  const baseCondig: CommandConfiguration = {
    name: 'fake-config',
  }

  test('should return empty object for empty config and empty input', () => {
    const args = prepareNamedArgs(baseCondig, {})

    expect(args).toEqual({})
  })

  test('should return empty object for empty config and any input', () => {
    const args = prepareNamedArgs(baseCondig, { hello: true, message: 'hello' })

    expect(args).toEqual({})
  })

  test('should return correct args if config to match input', () => {
    const args = prepareNamedArgs(
      {
        ...baseCondig,
        namedArgs: [
          {
            name: 'message',
          },
          {
            name: 'name',
          },
        ],
      },
      { message: 'hello', name: 'world' },
    )

    expect(args).toEqual({
      message: 'hello',
      name: 'world',
    })
  })

  test('shoult return correct args if minimal config to match input', () => {
    const args = prepareNamedArgs(
      {
        ...baseCondig,
        namedArgs: ['message', 'name'],
      },
      {
        message: 'hello',
        name: 'world',
      },
    )

    expect(args).toEqual({
      message: 'hello',
      name: 'world',
    })
  })

  test('should add notfound args from default values', () => {
    const args = prepareNamedArgs(
      {
        ...baseCondig,
        namedArgs: [
          {
            name: 'message',
          },
          {
            name: 'name',
            default: 'world',
          },
        ],
      },
      {
        message: 'hello',
      },
    )

    expect(args).toEqual({
      message: 'hello',
      name: 'world',
    })
  })

  test('should throw error if reqired arg does not provided', () => {
    expect(() =>
      prepareNamedArgs(
        {
          ...baseCondig,
          namedArgs: [
            {
              name: 'message',
            },
            {
              name: 'name',
              required: true,
            },
          ],
        },
        { message: 'hello' },
      ),
    ).toThrow(InvalidNamedArgsException)
  })
})
