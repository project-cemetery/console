export default interface Output {
  success(message: string): Promise<void>
  warning(message: string): Promise<void>
  error(message: string): Promise<void>
  info(message: string): Promise<void>
}
