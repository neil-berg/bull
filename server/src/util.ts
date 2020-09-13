import * as jwt from 'jsonwebtoken';

/**
 * Takes a user id and generate a JSON web token
 *
 * @param id {String} user id
 */
export function generateToken(id: string): string {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1 hour',
  });
  return token;
}
