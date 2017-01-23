import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import styles from './index.scss';

export default function Tabs ({pages, pathname}) {
  const activeItem = pages.filter(item => item.path === pathname)[0];

  return (
    <ul className={`${styles.tabs} clearfix`}>
      {pages.map((page, key) => (
        <li key={key} className={pages.length > 1 ? '' : 'pointer-disabled'}>
          <Link
            className={activeItem === page && styles.active}
            to={{
              pathname: page.path,
              query: page.query
            }}>

            {page.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

Tabs.propTypes = {
  pages: PropTypes.array.isRequired,
  pathname: PropTypes.string.isRequired
};
