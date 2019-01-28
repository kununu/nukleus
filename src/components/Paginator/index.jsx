/* eslint-disable no-plusplus */

import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import styles from './index.scss';

export default class Paginator extends React.Component {
  static propTypes = {
    baseLink: PropTypes.element.isRequired,
    pathname: PropTypes.string,
    query: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    queryKey: PropTypes.string,
    totalPages: PropTypes.number.isRequired,
  };

  static defaultProps = {
    pathname: '/',
    query: {},
    queryKey: 'page',
  };

  getPageRange (page) {
    let counter = 0;
    let currentPage = page - 3;
    const {totalPages} = this.props;
    const pageRange = [];

    for (let i = currentPage; i <= totalPages; i++) {
      if (currentPage <= 0) {
        currentPage++;
      } else if (counter < 7) {
        pageRange.push(currentPage);
        currentPage++;
        counter++;
      }
    }

    return pageRange;
  }

  getNewProps (queryValue) {
    const {
      baseLink,
      pathname,
      query,
      queryKey,
    } = this.props;

    const queryObject = this.parseQueryObject(query);
    const queryParams = queryString.stringify({...queryObject, [queryKey]: queryValue});

    if (baseLink.props.to) {
      return {
        to: {
          pathname,
          search: queryParams,
        },
      };
    }

    const location = baseLink.props.href ? 'href' : 'path';

    return {[location]: `${pathname}?${queryParams}`};
  }

  parseQueryObject = query => (typeof query === 'object') ? query : queryString.parse(query);

  render () {
    const {
      baseLink,
      query,
      queryKey,
      totalPages,
    } = this.props;

    const queryObject = this.parseQueryObject(query);

    const currentPage = Number(queryObject[queryKey]) || 1;
    const totalPagesArray = this.getPageRange(currentPage);
    const previousPage = currentPage !== 1 ? currentPage - 1 : currentPage;
    const nextPage = currentPage !== totalPages ? currentPage + 1 : currentPage;

    return (
      <div className={styles.paginator}>
        <ul
          className={styles.paginatorList}
          role="navigation"
          aria-label="Pagination"
        >
          <li className={(totalPages === 1 || !currentPage || currentPage === 1) ? styles.disabled : undefined}>
            {React.cloneElement(baseLink, this.getNewProps(previousPage), '<')}
          </li>

          {totalPagesArray.map(item => (
            <li
              key={item}
              className={currentPage === item ? styles.active : undefined}
            >
              {React.cloneElement(baseLink, this.getNewProps(item), item)}
            </li>
          ))}

          <li className={currentPage === totalPages ? styles.disabled : undefined}>
            {React.cloneElement(baseLink, this.getNewProps(nextPage), '>')}
          </li>
        </ul>
      </div>
    );
  }
}
