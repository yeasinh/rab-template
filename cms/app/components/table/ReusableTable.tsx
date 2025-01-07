import React from "react";
import "./style.css";

interface Column {
  header: string;
  accessor: string;
  isImage?: boolean;
  dateTime?: boolean;
}

interface TableProps {
  columns: Column[];
  data: any[];
  renderRowActions?: (row: any) => React.ReactNode;
}

const ReusableTable: React.FC<TableProps> = ({
  columns,
  data,
  renderRowActions,
}) => {
  return (
    <table className="table table-hover table-striped table-bordered ">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index} scope="col">
              {col.header}
            </th>
          ))}
          {renderRowActions && <th scope="col">Action</th>}
        </tr>
      </thead>
      <tbody>
        {data?.length > 0 ? (
          data?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  style={{ whiteSpace: "normal", wordBreak: "break-word" }}
                >
                  {col.isImage ? (
                    <img
                      src={
                        row[col.accessor] || "https://via.placeholder.com/50"
                      }
                      alt="Image"
                      className="img-fluid img_size"
                    />
                  ) : col.dateTime ? (
                    <>
                      <p>{row[col.accessor]?.split("T")[0]}</p>
                      <p>{row[col.accessor]?.split("T")[1]}</p>
                    </>
                  ) : (
                    row[col.accessor] || "N/A"
                  )}
                </td>
              ))}
              {renderRowActions && <td>{renderRowActions(row)}</td>}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + 1} className="text-center">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ReusableTable;
