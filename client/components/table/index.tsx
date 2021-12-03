// import React from "react";
// import {
//   Column,
//   useExpanded,
//   useTable,
//   useResizeColumns,
//   useFlexLayout,
// } from "react-table";
// import SiteLayout from "../components/siteLayout";

// type Data = {
//   col1: string;
//   col2: string;
//   avatar: string;
//   source: string;
//   rarity: number;
//   price: number;
// };

// type AvatarProps = {
//   value: string;
// };

// interface IProps {
//   data: {}[];
//   columns: {}[];
// }

// export function AvatarCell(props: AvatarProps) {
//   return (
//     <img className="rounded-md" src={props.value} width={38} height={38} />
//   );
// }

// export const avatarColumnProps = {
//   width: 24,
//   minWidth: 24,
//   maxWidth: 24,
//   filterable: false,
//   Cell: AvatarCell,
// };

// function Items() {
//   const data = React.useMemo<Data[]>(
//     () => [
//       {
//         col1: "Hello",
//         col2: "World",
//         avatar: "./weapon.jpg",
//         source: "Drop, Vendor",
//         rarity: 2,
//         price: 100,
//       },

//       {
//         col1: "react-table",
//         col2: "rocks",
//         avatar: "./weapon.jpg",
//         source: "Drop, Vendor",
//         rarity: 2,
//         price: 100,
//       },

//       {
//         col1: "whatever",
//         col2: "you want",
//         avatar: "./weapon.jpg",
//         source: "Drop, Vendor",
//         rarity: 2,
//         price: 100,
//       },
//     ],
//     []
//   );

//   const columns = React.useMemo<Column<Data>[]>(
//     () => [
//       {
//         // Build our expander column
//         id: "expander", // Make sure it has an ID
//         Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }: any) => (
//           <span {...getToggleAllRowsExpandedProps()}>
//             {isAllRowsExpanded ? "👇" : "👉"}
//           </span>
//         ),
//         width: 32,
//         Cell: ({ row }: any) =>
//           // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
//           // to build the toggle for expanding a row
//           row.canExpand ? (
//             <span
//               {...row.getToggleRowExpandedProps({
//                 style: {
//                   // We can even use the row.depth property
//                   // and paddingLeft to indicate the depth
//                   // of the row
//                   paddingLeft: `${row.depth * 2}rem`,
//                 },
//               })}
//             >
//               {row.isExpanded ? "👇" : "👉"}
//             </span>
//           ) : null,
//       },
//       { Header: "Name", accessor: "avatar", ...avatarColumnProps },
//       {
//         Header: "",
//         accessor: "col1", // accessor is the "key" in the data,
//       },
//       {
//         Header: "Type",
//         accessor: "col2",
//       },
//       {
//         Header: "Source",
//         accessor: "source",
//       },
//       {
//         Header: "Rarity",
//         accessor: "rarity",
//       },
//       {
//         Header: "Price",
//         accessor: "price",
//       },
//     ],
//     []
//   );

//   const defaultColumn = React.useMemo(
//     () => ({
//       // When using the useFlexLayout:
//       minWidth: 30, // minWidth is only used as a limit for resizing
//       width: 150, // width is used for both the flex-basis and flex-grow
//       maxWidth: 200, // maxWidth is only used as a limit for resizing
//     }),
//     []
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable(
//     { columns, data, defaultColumn },
//     useResizeColumns,
//     useFlexLayout,
//     useExpanded
//   );

//   return (
//     <SiteLayout>
//       {/* // apply the table props */}
//       <table className="w-full" {...getTableProps()}>
//         <thead>
//           {
//             // Loop over the header rows
//             headerGroups.map((headerGroup) => (
//               // Apply the header row props
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {
//                   // Loop over the headers in each row
//                   headerGroup.headers.map((column) => (
//                     // Apply the header cell props
//                     <th className="text-left" {...column.getHeaderProps()}>
//                       {
//                         // Render the header
//                         column.render("Header")
//                       }
//                     </th>
//                   ))
//                 }
//               </tr>
//             ))
//           }
//         </thead>

//         {/* Apply the table body props */}
//         <tbody {...getTableBodyProps()}>
//           {
//             // Loop over the table rows
//             rows.map((row) => {
//               // Prepare the row for display
//               prepareRow(row);
//               return (
//                 // Apply the row props
//                 <tr
//                   className="w-full p-1 border-t border-b border-gray-400"
//                   {...row.getRowProps()}
//                 >
//                   {
//                     // Loop over the rows cells
//                     row.cells.map((cell) => {
//                       // Apply the cell props
//                       return (
//                         <td {...cell.getCellProps()}>
//                           {
//                             // Render the cell contents
//                             cell.render("Cell")
//                           }
//                         </td>
//                       );
//                     })
//                   }
//                 </tr>
//               );
//             })
//           }
//         </tbody>
//       </table>
//     </SiteLayout>
//   );
// }

// export default Items;
