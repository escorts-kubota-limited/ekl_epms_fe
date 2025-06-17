// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
//   getPaginationRowModel,
//   getFilteredRowModel,
// } from "@tanstack/react-table";
// import { useState } from "react";

// const MajorProjectTemplate = ({data,columns}) => {
//   // {
//   //     "project_name": "squidoo.com",
//   //     "phase": 1,
//   //     "stage": "Abatz",
//   //     "date_modified": "07/04/2024"
//   //   },
  
//   const [filtering, setfiltering] = useState('')
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel:getPaginationRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     state:{
//         globalFilter: filtering
//     },
//     onGlobalFilterChange: setfiltering
//   });

//   return (
//     <div className="w3-container">
//         <input type="text" value={filtering} onChange={(e)=>setfiltering(e.target.value)}/>
//       <table className="w3-table-all">
//         <thead>
//         {table.getHeaderGroups().map((headerGroup) => (
//           <tr key={headerGroup.id}>
//             {headerGroup.headers.map((header) => (
//               <th key={header.id}>
//                 {flexRender(
//                   header.column.columnDef.header,
//                   header.getContext()
//                 )}
//               </th>
//             ))}
//           </tr>
//         ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id}>
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div>
//         <button onClick={()=>{table.setPageIndex(0)}}>First</button>
//         <button  disabled={!table.getCanPreviousPage()} onClick={()=>{table.previousPage()}}>Previous</button>
//         <button disabled={!table.getCanNextPage()} onClick={()=>{table.nextPage()}}>Next</button>
//         <button onClick={()=>{table.setPageIndex(table.getPageCount()-1)}}>Last</button>
//       </div>
//     </div>
//   );
// };

// export default MajorProjectTemplate;
// import React from 'react'

// const MajorProjectTemplate = () => {
//   return (
//     <div>MajorProjectTemplate</div>
//   )
// }

// export default MajorProjectTemplate