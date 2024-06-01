import React, { useState, useEffect } from "react";
import {
  ArrowsUpDownIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"; // Double arrow icon

interface Props {
  data: any[];
  columns: string[];
  search?: string;
  showCheckbox?: boolean;
  actionsCol?: string[];
  sortableColumns?: string[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

export const Table: React.FC<Props> = ({
  data,
  columns,
  search,
  showCheckbox,
  actionsCol,
  sortableColumns = [],
  onEdit,
  onDelete,
}) => {
  const [filteredData, setFilteredData] = useState(data);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  useEffect(() => {
    if (search) {
      setFilteredData(
        data.filter((item) =>
          columns.some((col) =>
            item[col].toString().toLowerCase().includes(search.toLowerCase())
          )
        )
      );
    } else {
      setFilteredData(data);
    }
  }, [data, search, columns]);

  const handleSort = (column: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === column &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key: column, direction: direction });
  };

  const sortedData = React.useMemo(() => {
    if (sortConfig !== null) {
      return [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredData;
  }, [filteredData, sortConfig]);

  return (
    <div className="relative overflow-x-auto border-1 radius-t-1">
      <table className="w-full text-left">
        <thead className="bg-gray border-b-1">
          <tr>
            {showCheckbox && (
              <th scope="col" className="font-primary">
                <div className="flex flex-grow justify-end items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-[16px] h-[16px] rounded"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
            )}
            {columns.map((col, index) => (
              <th
                key={index}
                scope="col"
                className="font-primary px-4 py-2 cursor-pointer"
                onClick={() => sortableColumns.includes(col) && handleSort(col)}
              >
                <div className="flex items-center">
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                  {sortableColumns.includes(col) && (
                    <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
                  )}
                </div>
              </th>
            ))}
            {actionsCol && (
              <th scope="col" className="font-primary px-4 py-2">
                <EllipsisHorizontalIcon className="h-6 w-6 m-auto" />
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index} className="bg-white border-b-1 hover:bg-gray-50">
              {showCheckbox && (
                <td className="pl-4">
                  <div className="flex flex-grow justify-end items-center">
                    <input
                      id={`checkbox-${index}`}
                      type="checkbox"
                      className="w-[16px] h-[16px] rounded"
                    />
                    <label htmlFor={`checkbox-${index}`} className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
              )}
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="p-4">
                  <h5>{item[col]}</h5>
                </td>
              ))}
              {actionsCol && (
                <td className="p-4 text-center">
                  {actionsCol.includes("edit") && (
                    <button
                      className="thover:underline mr-2"
                      onClick={() => onEdit && onEdit(item)}
                    >
                      Edit
                    </button>
                  )}
                  {actionsCol.includes("delete") && (
                    <button
                      className="hover:underline"
                      onClick={() => onDelete && onDelete(item)}
                    >
                      <TrashIcon className="h-4 w-4"></TrashIcon>
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
