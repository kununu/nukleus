/* eslint-disable no-plusplus */

import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import styles from './index.scss';

function pages (page, totalPages) {
  let counter = 0;
  const pageRange = [];
  let currentPage = page - 3;

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

export default function Paginator ({
  pathname,
  query,
  totalPages
}) {
  const currentPage = Number(query.page) || 1;
  const totalPagesArray = pages(currentPage, totalPages);
  const previousPage = currentPage !== 1 ? currentPage - 1 : currentPage;
  const nextPage = currentPage !== totalPages ? currentPage + 1 : currentPage;

  return (
    <div className={styles.paginator}>
      <ul className="pagination" role="navigation" aria-label="Pagination">
        <li className={(totalPages === 1 || !currentPage || currentPage === 1) && 'disabled pointer-disabled'}>
          <Link
            to={{
              pathname,
              query: {...query, page: previousPage}
            }}>

            &lt;
          </Link>
        </li>

        {totalPagesArray.map(item =>
          <li key={item} className={currentPage === item ? 'active pointer-disabled' : 'inActive'}>
            <Link
              to={{
                pathname,
                query: {...query, page: item}
              }}>

              {item}
            </Link>
          </li>
        )}

        <li className={currentPage === totalPages && 'disabled pointer-disabled'}>
          <Link
            to={{
              pathname,
              query: {...query, page: nextPage}
            }} >

            &gt;
          </Link>
        </li>
      </ul>
    </div>
  );
}

Paginator.propTypes = {
  pathname: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
  totalPages: PropTypes.number.isRequired
};

Paginator.defaultProps = {
  pathname: '/',
  query: {}
};
