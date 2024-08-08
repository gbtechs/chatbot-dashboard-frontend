import React, { useState, useEffect } from "react";
import { ArrowsUpDownIcon, TrashIcon } from "@heroicons/react/24/outline"; // Double arrow icon
import { formatDate } from "@/utils";
import Pagination from "./Pagination";

interface Props {
  data: any[];
  columns: string[];
  colMap: any;
  search?: string;
  showCheckbox?: boolean;
  actionsCol?: string[];
  sortableColumns?: string[];
  paginated?: boolean;
  page?: number;
  size?: number;
  count?: number;
  roundedBottom?: true;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onPageChange?: (item: any) => void;
}

export const Table: React.FC<Props> = ({
  data,
  columns,
  colMap,
  search,
  showCheckbox,
  actionsCol,
  sortableColumns = [],
  paginated = false,
  page = 1,
  size = 20,
  count = 0,
  roundedBottom = false,
  onEdit,
  onDelete,
  onPageChange,
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

  const isValidDate = (value: any) => {
    if (!isNaN(value)) {
      return false; // coz it return a valid date even for 14483
    }
    return !isNaN(Date.parse(value));
  };

  return (
    <>
      <div
        className={`relative overflow-x-auto border-1 ${
          roundedBottom ? "radius-1" : "radius-t-1"
        }`}
      >
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
                  onClick={() =>
                    sortableColumns.includes(col) && handleSort(col)
                  }
                >
                  <div
                    className={`flex items-center${
                      !showCheckbox && index === 0 && " pl-4"
                    }`}
                  >
                    {colMap[col]}
                    {sortableColumns.includes(col) && (
                      <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
                    )}
                  </div>
                </th>
              ))}
              {actionsCol && (
                <th scope="col" className="font-primary px-4 py-2">
                  <img
                    className="h-6 w-6 m-auto"
                    src="./icons/menu-dots.svg"
                    alt="..."
                  />
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
                {columns.map((col, colIndex) => {
                  const value = item[col];
                  const formattedValue = isValidDate(value)
                    ? formatDate(value)
                    : value;
                  return (
                    <td key={colIndex} className="p-4">
                      <h5
                        className={`${
                          !showCheckbox && colIndex === 0 && "pl-4"
                        }`}
                      >
                        {formattedValue}
                      </h5>
                    </td>
                  );
                })}
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
                        <img
                          className="h-4 w-4"
                          src="./icons/trashcan.svg"
                          alt="delete"
                        />
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {paginated && (
        <div>
          <Pagination
            page={page}
            count={count}
            size={size}
            onPageChange={(e) => onPageChange && onPageChange(e)}
          ></Pagination>
        </div>
      )}
    </>
  );
};
