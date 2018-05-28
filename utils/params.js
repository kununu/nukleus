/**
 * Transforms a query string
 * into an object
 *
 * @param  {[type]} query string
 * @return {[type]}       object
 */
export const queryParamsToObject = query => {
  if (!query) return {};

  if (typeof query === 'object') return query;

  return query
    // Remove ? from string
    .substring(1)
    // Split by &
    .split('&')
    // Transform to object
    .reduce((acc, curr) => {
      const qItem = curr.split('=');
      return {
        ...acc,
        [qItem[0]]: qItem[1]
      };
    }, {});
};

/**
 * Transforms query object
 * into a string
 *
 * @param  {[type]} query string
 * @return {[type]}       [description]
 */
export const queryParamsToString = query => Object.keys(query)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
  .join('&');
