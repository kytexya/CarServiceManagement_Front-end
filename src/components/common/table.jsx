import React from "react";

export default function CustomTable({ columns, data, renderActions }) {
  return (
    <div className="overflow-x-auto shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-3 text-center uppercase font-semibold tracking-wide text-gray-950 border-gray-300"
              >
                {col.header}
              </th>
            ))}
            {renderActions && (
              <th className="px-4 py-3 uppercase text-center font-semibold text-gray-800 border-b border-gray-300">
                Hành động
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (renderActions ? 1 : 0)}
                className="text-center py-4 text-gray-500"
              >
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50 border-b border-gray-100 transition duration-200"
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 text-center">
                    {row[col.field]}
                  </td>
                ))}
                {renderActions && (
                  <td className="px-4 py-2 text-center">
                    {renderActions(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
