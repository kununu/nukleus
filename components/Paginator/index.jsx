/* eslint-disable no-plusplus */

import React, {PropTypes, Component} from 'react';
// import {Link} from 'react-router';

import styles from './index.scss';


export default class Paginator extends Component {
  static propTypes = {
    baseLink: PropTypes.element.isRequired,
    pathname: PropTypes.string.isRequired,
    query: PropTypes.object,
    queryKey: PropTypes.string.isRequired,
    totalPages: PropTypes.number.isRequired
  };

  static defaultProps = {
    pathname: '/',
    query: {},
    queryKey: 'page'
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

  render () {
    const {
      baseLink,
      totalPages,
      queryKey,
      query,
      pathname
    } = this.props;
    const currentPage = Number(query[queryKey]) || 1;
    const totalPagesArray = this.getPageRange(currentPage, totalPages);
    const previousPage = currentPage !== 1 ? currentPage - 1 : currentPage;
    const nextPage = currentPage !== totalPages ? currentPage + 1 : currentPage;

    return (
      <div className={styles.paginator}>
        <ul className="pagination" role="navigation" aria-label="Pagination">
          <li className={(totalPages === 1 || !currentPage || currentPage === 1) && 'disabled pointer-disabled'}>
            {React.cloneElement(baseLink, {
              to: {
                pathname,
                query: {...query, [queryKey]: previousPage}
              }
            }, '<')}
          </li>

          {totalPagesArray.map(item =>
            <li key={item} className={currentPage === item ? 'active pointer-disabled' : 'inActive'}>
              {React.cloneElement(baseLink, {
                to: {
                  pathname,
                  query: {...query, [queryKey]: item}
                }
              }, item)}
            </li>
          )}

          <li className={currentPage === totalPages && 'disabled pointer-disabled'}>
            {React.cloneElement(baseLink, {
              to: {
                pathname,
                query: {...query, [queryKey]: nextPage}
              }
            }, '>')}
          </li>
        </ul>
      </div>
    );
  }
}
