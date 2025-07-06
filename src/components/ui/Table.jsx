import React from 'react';
import '../styles/Table.css';

const Table = ({
  data = {},
  columns = [],
  onPageChange,
  onActionClick,
  emptyMessage = 'No data available',
  actionColumnText = 'Actions',
  actionColumnWidth = '150px'
}) => {
  const {
    list = [],
    total_pages = 1,
    current_page = 1,
    total_count = 0,
    per_page = 10
  } = data;

  const handleAction = (action, item) => {
    onActionClick?.(action, item);
  };

  const renderPagination = () => {
    if (total_pages <= 1) return null;

    return (
      <div className="pagination">
        <button
          onClick={() => onPageChange?.(current_page - 1)}
          disabled={current_page === 1}
        >
          Previous
        </button>
        
        <span>Page {current_page} of {total_pages} (Total Count: {total_count})</span>
        
        <button
          onClick={() => onPageChange?.(current_page + 1)}
          disabled={current_page === total_pages}
        >
          Next
        </button>
      </div>
    );
  };

  if (!list?.length) {
    return <div className="empty-message">{emptyMessage}</div>;
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} style={{ width: col.width }}>
                {col.title}
              </th>
            ))}
            {onActionClick && (
              <th style={{ width: actionColumnWidth }}>
                {actionColumnText}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={index}>
              {columns.map(col => (
                <td key={col.key}>
                  {col.render?.(item) ?? item[col.key]}
                </td>
              ))}
              
              {onActionClick && item.actions && (
                <td className="actions-cell">
                  {item.actions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => handleAction(action.type, item)}
                      className={`action-btn ${action.type}`}
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {renderPagination()}
    </div>
  );
};

export default Table;