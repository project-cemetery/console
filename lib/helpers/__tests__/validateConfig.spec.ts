import CommandConfiguration from '../../command/CommandConfiguration'

import validateConfig, { InvalidConfigException } from '../validateConfig'

describe('validateConfig', () => {
  const baseConfig: CommandConfiguration = {
    name: 'fake-config',
  }

  test('should pass on empty config', () => {
    const valid = validateConfig(baseConfig)

    expect(valid).toBeTruthy()
  })

  describe('valid position args', () => {
    test('should pass on string config', () => {
      const valid = validateConfig({
        ...baseConfig,
        positionArgs: ['message', 'name'],
      })

      expect(valid).toBeTruthy()
    })

    test('should pass on object config', () => {
      const valid = validateConfig({
        ...baseConfig,
        positionArgs: [
          {
            name: 'message',
            position: 0,
          },
          {
            name: 'name',
          },
        ],
      })

      expect(valid).toBeTruthy()
    })

    test('should pass on combine config', () => {
      const valid = validateConfig({
        ...baseConfig,
        positionArgs: [
          {
            name: 'message',
            position: 0,
          },
          'name',
          { name: 'extra' },
        ],
      })

      expect(valid).toBeTruthy()
    })
  })

  describe('should pass valid named args', () => {
    const valid = validateConfig({
      ...baseConfig,
      namedArgs: [{ name: 'message', shortcut: 'm' }, { name: 'name' }],
    })

    expect(valid).toBeTruthy()
  })

  describe('should throw on duplicate position for position args', () => {
    const validate = () =>
      validateConfig({
        ...baseConfig,
        positionArgs: [
          {
            name: 'message',
            position: 1,
          },
          'name',
          { name: 'extra' },
        ],
      })

    expect(validate).toThrow(InvalidConfigException)
  })

  describe('should throw on duplicate names for named args', () => {
    const validate = () =>
      validateConfig({
        ...baseConfig,
        namedArgs: [{ name: 'message' }, { name: 'message' }],
      })

    expect(validate).toThrow(InvalidConfigException)
  })

  describe('should throw on duplicate shortcuts for named args', () => {
    const validate = () =>
      validateConfig({
        ...baseConfig,
        namedArgs: [
          { name: 'message', shortcut: 'm' },
          { name: 'main', shortcut: 'm' },
        ],
      })

    expect(validate).toThrow(InvalidConfigException)
  })

  describe('should throw on duplicate shortcuts for named args', () => {
    const validate = () =>
      validateConfig({
        ...baseConfig,
        namedArgs: ['message', 'message'],
      })

    expect(validate).toThrow(InvalidConfigException)
  })
})
