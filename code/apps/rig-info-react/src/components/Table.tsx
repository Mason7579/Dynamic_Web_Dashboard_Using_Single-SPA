import React, { useState, useEffect } from 'react';
import sampleData from './Data';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { HubConnectionBuilder } from '@microsoft/signalr';
import LiveIndicator from './LiveIndicator';
import '../styles.css';

interface DataItem {
  id: number;
  datetime: string;
  wellID: number;
  status: string;
}

const connection = new HubConnectionBuilder()
  .withUrl('http://localhost/api/rig-messenger-api/hub')
  .build();
let signalRConnection = false;

async function connectSignalR() {
  try {
    await connection.start();
    signalRConnection = true;
  } catch (err) {
    signalRConnection = false;
  }
}

const TableComponent: React.FC = () => {
  const [data, setData] = useState<DataItem[]>(sampleData);

  useEffect(() => {
    connectSignalR();

    connection.on('messageData', (msg) => {
      const { id, timestamp, wellId, message } = msg;
      const newRecord = {
        id,
        datetime: timestamp,
        wellID: wellId,
        status: message,
      };
      setData((prevData) => [...prevData, newRecord]);

      // Send data to the status bar
      const detail = {
        widgetId: 4,
        data: {
          message: newRecord,
        },
      };
      const dataUpdatedEvent = new CustomEvent('DataUpdated', {
        detail: detail,
      });
      window.dispatchEvent(dataUpdatedEvent);
    });

    return () => {
      connection.stop();
    };
  }, []);

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div data-testid="Table Component">
      <div>
        <TableContainer
          component={Paper}
          style={{ borderRadius: '0px' }}
          className="dark:bg-[#2D2D2D] dark:text-[#E2EFEF]"
        >
          <Table
            aria-label="simple table"
            data-testid="table"
            sx={{ minWidth: 0 }}
          >
            <TableHead>
              <TableRow id="table-row">
                <TableCell
                  align="right"
                  id="table-cell"
                  className="dark:text-[#E2EFEF]"
                >
                  ID
                </TableCell>
                <TableCell
                  align="right"
                  id="table-cell"
                  className="dark:text-[#E2EFEF]"
                >
                  Date Time (CST)
                </TableCell>
                <TableCell
                  align="right"
                  id="table-cell"
                  className="dark:text-[#E2EFEF]"
                >
                  Well ID
                </TableCell>
                <TableCell
                  align="right"
                  id="table-cell"
                  className="dark:text-[#E2EFEF]"
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody id="table-row">
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((record) => (
                  <TableRow
                    key={record.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    className="dark:text-[#E2EFEF]"
                  >
                    <TableCell
                      align="right"
                      id="table-cell"
                      className="dark:text-[#E2EFEF]"
                    >
                      {record.id}
                    </TableCell>
                    <TableCell
                      align="right"
                      id="table-cell"
                      className="dark:text-[#E2EFEF]"
                    >
                      {record.datetime}
                    </TableCell>
                    <TableCell
                      align="right"
                      id="table-cell"
                      className="dark:text-[#E2EFEF]"
                    >
                      {record.wellID}
                    </TableCell>
                    <TableCell
                      align="right"
                      id="table-cell"
                      className="dark:text-[#E2EFEF]"
                    >
                      {record.status}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div id="bottom-bar" className="dark:text-[#E2EFEF]">
          <div id="live-indicator" data-testid="indicator">
            <LiveIndicator isLive={signalRConnection} />
          </div>
          <TablePagination
            id="table-pagination"
            rowsPerPageOptions={[5]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            data-testid="pagination"
            className="dark:text-[#E2EFEF]"
          />
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
