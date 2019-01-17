import chalk from 'chalk'

import Output from '../Output'

// tslint:disable:no-console

const totalWhite = 'FFFFFF'

// Themes
const themeSuccess = chalk.green
const themeError = chalk.hex(totalWhite).bgRed
const themeWarning = chalk.hex(totalWhite).bgYellow
const themeInfo = chalk

export default class ConsoleOutput implements Output {
  public success = async (message: string) => console.log(themeSuccess(message))
  public warning = async (message: string) =>
    console.warn(themeWarning(message))
  public error = async (message: string) => console.error(themeError(message))
  public info = async (message: string) => console.info(themeInfo(message))
}
