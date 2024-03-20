import crypto from 'crypto'

export class EncryptionService {
  private algorithm = 'sha512'

  generate(loginPass: string): string {
    const hash = crypto.createHmac(this.algorithm, loginPass)
    return hash.digest('hex')
  }

  verify(loginPass: string, registeredHash: string): boolean {
    const loginHash = crypto.createHmac(this.algorithm, loginPass)
    return loginHash.digest('hex') === registeredHash
  }
}
