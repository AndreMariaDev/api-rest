import * as bcrypt from 'bcrypt';

export function encodePassword(rawString: string): string {
    const SALT = bcrypt.genSaltSync();
    return  bcrypt.hashSync(rawString, SALT);
}

export function isValideHash(rawString: string, hashString: string): boolean {
    return bcrypt.compareSync(rawString, hashString);
}