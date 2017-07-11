import React, {PropTypes} from 'react';

import styles from './index.scss';

function getRows (cols) {
  return (
    [...Array(cols[0].length)].reduce((acc, item, index) => {
      acc[index] = [];
      cols.forEach(col => {
        acc[index].push(col[index]);
      });
      return acc;
    }, [])
  );
}

function getRow (value, index) {
  if (!value) return <td key={index} />;
  return (
    <td key={index}>
      {value}
    </td>);
}

function getTitles (value, index) {
  return !value ?
    <th key={index} className={styles.emptyHeader} /> : // eslint-disable-line react/no-array-index-key
    <th key={index}><span>{value}</span></th>; // eslint-disable-line react/no-array-index-key
}

export default function Table ({
  items,
  defaultTitleCount,
  defaultRowCount,
  tableStyle
}) {
  const keys = Object.keys(items);
  const hasItems = keys.length !== 0;
  const titles = hasItems ?
                    keys :
                    [...Array(defaultTitleCount)];
  const rowCount = hasItems ?
                    items[keys[0]].length :
                    defaultRowCount;
  const rows = hasItems ?
                getRows(keys.map(item => items[item])) :
                [...Array(defaultTitleCount)];

  return (
    <div className={`${styles.tableContainer} ${styles[tableStyle]}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            {titles.map(getTitles)}
          </tr>
        </thead>

        <tbody>
          {[...Array(rowCount)].map((row, rowIndex) =>
            (<tr
              key={rowIndex} // eslint-disable-line react/no-array-index-key
              className={(hasItems ? '' : styles.emptyTd)}>

              {
                hasItems ?
                  rows[rowIndex].map(getRow) :
                  rows.map(getRow)
              }
            </tr>)
          )}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  defaultRowCount: PropTypes.number,
  defaultTitleCount: PropTypes.number,
  items: PropTypes.object,
  tableStyle: PropTypes.string
};

Table.defaultProps = {
  defaultRowCount: 8,
  defaultTitleCount: 5,
  items: {},
  tableStyle: 'full-panel'
};
