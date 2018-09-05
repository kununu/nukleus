import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconCaretUp from '@kununu/kununu-icons/dist/CaretUp';
import IconCaretDown from '@kununu/kununu-icons/dist/CaretDown';

import styles from './index.scss';

class Table extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
      // String that matches to data key.
      accessor: PropTypes.string.isRequired,
      // For custom cells. You can use either
      // an element or custom func which will
      // receive a value param.
      // ie: value => <span>{value}</span>
      cell: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func
      ]),
      // Header is the value that will be shown
      // in the hr cell per column
      header: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.element,
        PropTypes.bool,
        PropTypes.string
      ]),
      sortable: PropTypes.bool
    })).isRequired,
    dataRows: PropTypes.arrayOf(PropTypes.object),
    initialSortingColumn: PropTypes.number
  };

  static defaultProps = {
    dataRows: [],
    initialSortingColumn: -1
  };

  state = {rows: this.props.dataRows} // eslint-disable-line

  componentDidMount () {
    const {initialSortingColumn, columns} = this.props;

    if (initialSortingColumn >= 0) {
      this.handleSorting(columns[initialSortingColumn].accessor, 1);
    }
  }

  componentWillReceiveProps (nextProps) {
    const {dataRows, initialSortingColumn, columns} = this.props;

    if (JSON.stringify(nextProps.dataRows) !== JSON.stringify(dataRows)) {
      this.setState({rows: nextProps.dataRows}, () => {
        if (initialSortingColumn >= 0) {
          this.handleSorting(columns[initialSortingColumn].accessor, 1);
        }
      });
    }
  }

  /**
   * Sort the rows based on
   * column and sort order
   */
  handleSorting = (accessor, sortOrder) => {
    const {rows} = this.state;

    rows.sort((a, b) => {
      // If a data entry is undefined it must be set it to
      // an empty string in order to make a correct
      // comparison
      const aVal = a[accessor] || '';
      const bVal = b[accessor] || '';
      const isString = typeof aVal === 'string' && Number.isNaN(parseFloat(aVal));

      // If row data contains numbers
      // we should filter based on value
      if (!isString) return ((parseFloat(aVal) || Number.NEGATIVE_INFINITY) - (parseFloat(bVal) || Number.NEGATIVE_INFINITY)) * sortOrder;

      // If row data is a string
      // we first ignore upper & lowercase
      // and then do a comparison
      const itemA = aVal.toUpperCase();
      const itemB = bVal.toUpperCase();

      if (itemA < itemB) return -1 * sortOrder;
      if (itemA > itemB) return 1 * sortOrder;
      return 0;
    });

    this.setState({rows});
  }

  /*
   If the column is sortable the carets
   are added.
   */
  renderSortable = ({sortable, accessor}, idx) => {
    if (!sortable) return '';

    return (
      <div className={styles.sorting}>
        <button
          className={styles.sortingButton}
          id="button-asc"
          key={`${idx}-asc`}
          onClick={() => this.handleSorting(accessor, 1)}
          type="button">
          <IconCaretUp className={styles.sortingArrowIcon} ariaHidden />
        </button>
        <button
          className={styles.sortingButton}
          id="button-desc"
          key={`${idx}-desc`}
          onClick={() => this.handleSorting(accessor, -1)}
          type="button">
          <IconCaretDown className={styles.sortingArrowIcon} ariaHidden />
        </button>
      </div>
    );
  }

  /*
   Renders the table header in the
   order that is defined. The header can
   be an element or a string. If the column
   is sortable it will add a caret with the
   sorting functionality.
   */
  renderHeaders = () => {
    const {columns} = this.props;

    // Map over columns and output
    // header value
    return columns.map((column, idx) => (
      <th key={`column-${idx}`}>
        <div className={styles.sortingContainer}>
          <div className={styles.sortingTitle}>
            {column.header}
          </div>
          {this.renderSortable(column, idx)}
        </div>
      </th>
    ));
  }

  /*
   Renders the value for each td in
   the table body. This value can either
   be the value from the dataRows OR can
   be a custom cell which is generated via
   custom function for that column.
   */
  renderBodyCell = (item, {accessor, cell}) => {
    const value = item[accessor];

    if (typeof cell === 'function') {
      return cell(value);
    }

    return value;
  };

  /*
   Renders the rows and tds for the body of
   the table.
   */
  renderBody = () => {
    const {columns} = this.props;
    const {rows} = this.state;

    // Map over columns and output all values
    // from each row in order of columns.
    return rows.map((rowItem, index) => (
      <tr key={`row-${index}`}>
        {columns.map((column, idx) => (
          <td key={`${idx}-${column.accessor}`}>
            {this.renderBodyCell(rowItem, column)}
          </td>
        ))}
      </tr>
    ));
  }

  render () {
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            {this.renderHeaders()}
          </tr>
        </thead>
        <tbody>
          {this.renderBody()}
        </tbody>
      </table>
    );
  }
}

export default Table;
