import _ from 'lodash';
import React from 'react';
import { Divider, Table, Button } from 'semantic-ui-react';

function DataTable(props) {
  const { cols, rows, sortable, onCreate, onDelete, onEdit } = props;
  const callbackButtons = { onCreate, onDelete, onEdit };
  const tableRows = (rows && rows) || [];

  return (
    <React.Fragment>
      <Divider hidden />
      <Table compact="very" unstackable singleLine celled sortable={sortable}>
        {renderTableHead(cols, callbackButtons)}
        {!!tableRows.length && renderTableBody(cols, tableRows, callbackButtons)}
        {renderTableFoot(tableRows, cols, callbackButtons)}
      </Table>
    </React.Fragment>
  );
}

/**
 *
 * @param {Array} cols
 */
const renderTableHead = (cols, callbackButtons) => {
  return (
    <Table.Header fullWidth>
      <Table.Row>
        {hasAnyCallbackButton(callbackButtons) && <Table.HeaderCell />}
        {cols.map((col, index) => (
          <Table.HeaderCell key={index}>{col.name}</Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
  );
};

/**
 *
 * @param {Array} cols
 * @param {Array} rows
 */
const renderTableBody = (cols, rows, callbackButtons) => {
  return (
    <Table.Body>
      {rows.map((row) => (
        <Table.Row key={row.id}>
          {hasAnyCallbackButton(callbackButtons) && (
            <Table.Cell collapsing>
              <Button.Group size="mini" fluid>
                {callbackButtons.onDelete && (
                  <Button
                    icon="trash"
                    color="red"
                    onClick={() => callbackButtons.onDelete(row, 'delete')}
                    basic
                  />
                )}
                {callbackButtons.onEdit && (
                  <Button
                    icon="edit"
                    color="orange"
                    onClick={() => callbackButtons.onEdit(row, 'update')}
                    basic
                  />
                )}
              </Button.Group>
            </Table.Cell>
          )}

          {cols.map((col) => {
            const cell = getCellValue(row, col.dataKey);

            return <Table.Cell key={col.name}>{cell}</Table.Cell>;
          })}
        </Table.Row>
      ))}
    </Table.Body>
  );
};

const renderTableFoot = (rows, cols, callbackButtons) => {
  const incColSpan = hasAnyCallbackButton(callbackButtons) ? 1 : 0;
  const colSpanLen = incColSpan + cols.length;
  return (
    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell colSpan={colSpanLen}>
          <Button
            icon="add"
            basic
            color="green"
            size="mini"
            floated="left"
            onClick={() => callbackButtons.onCreate(null, 'create')}
          />
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
};

const getCellValue = (row, dataKey) => {
  return _.get(row, dataKey);
};

const hasAnyCallbackButton = (callbackButtons) => {
  const { onCreate, onEdit, onDelete } = callbackButtons;

  return !!onCreate || !!onEdit || !!onDelete;
};

export default DataTable;
