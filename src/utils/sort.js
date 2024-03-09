
// export function sorting(obj1, obj2) {
//         setSortCol(obj2);
//         if (sortCol === obj2) {
//           if (obj1 === "stats") {
//             if (order === "DEF") {
//               const sorted = props.currency.sort((a, b) =>
//                 Number(a[obj1][obj2]) > Number(b[obj1][obj2]) ? 1 : -1
//               );
//               props.setCurrency(sorted);
//               setOrder("ASC");
//             } else if (order === "ASC") {
//               const sorted = props.currency.sort((a, b) =>
//                 Number(a[obj1][obj2]) < Number(b[obj1][obj2]) ? 1 : -1
//               );
//               props.setCurrency(sorted);
//               setOrder("DSC");
//             } else {
//               const sorted = defaultCurrency;
//               props.setCurrency(sorted);
//               setOrder("DEF");
//             }
//           } else {
//             if (order === "DEF") {
//               const sorted = props.currency.sort((a, b) =>
//                 a[obj1] > b[obj1] ? 1 : -1
//               );
//               props.setCurrency(sorted);
//               setOrder("ASC");
//             }
//             if (order === "ASC") {
//               const sorted = props.currency.sort((a, b) =>
//                 a[obj1] < b[obj1] ? 1 : -1
//               );
//               props.setCurrency(sorted);
//               setOrder("DSC");
//             }
//             if (order === "DSC") {
//               const sorted = defaultCurrency;
//               props.setCurrency(sorted);
//               setOrder("DEF");
//             }
//           }
//         } else if (obj1 === "stats") {
//           const sorted = props.currency.sort((a, b) =>
//             Number(a[obj1][obj2]) > Number(b[obj1][obj2]) ? 1 : -1
//           );
//           props.setCurrency(sorted);
//           setOrder("ASC");
//         } else {
//           const sorted = props.currency.sort((a, b) =>
//             a[obj1] > b[obj1] ? 1 : -1
//           );
//           props.setCurrency(sorted);
//           setOrder("ASC");
//         }
//       };
