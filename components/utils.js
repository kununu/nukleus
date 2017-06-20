/* eslint-disable import/prefer-default-export */

/**
 * Replaces New Lines and multiple spaces and returns the new value
 *
 * @return {string} [updated value]
 */
const sanitizeWhitespaceRegex = /\r\n|\r|\n| +/g;
export function sanitizeWhitespace (value) {
  return value.replace(sanitizeWhitespaceRegex, ' ');
}
