const arr = [
    {
        "countersign": "0",
        "cj": 0
    },
    {
        "countersign": "0",
        "cj": 1
    },
    {
        "countersign": "0",
        "cj": 2
    },
    {
        "countersign": "0",
        "cj": 3
    },
    {
        "countersign": "0",
        "cj": 3
    },
    {
        "countersign": "1",
        "cj": 4
    },
    {
        "countersign": "1",
        "cj": 4
    },
    {
        "countersign": "1",
        "cj": 5
    },
    {
        "countersign": "1",
        "cj": 4
    },
    {
        "countersign": "1",
        "cj": 4
    },
    {
        "countersign": "1",
        "cj": 5
    },
    {
        "countersign": "1",
        "cj": 5
    },
    {
        "countersign": "1",
        "cj": 3
    },
    {
        "countersign": "1",
        "cj": 3
    },
    {
        "countersign": "1",
        "cj": 3
    }
]

const mergeList = (arrold) => {
  const arr = arrold.map(x => ({
    ...x
  }))
  for (const index in arr) {
    let item = arr[index]
    const lastItem = arr[index - 1]
    if (item.countersign === "1" && item.cj === lastItem.cj) {
        arr[index] = { bf: [ ...lastItem.bf || [{...lastItem}], {...item}], ...item };
        arr[index - 1] = null
    }
  }
  return arr.filter(Boolean).map(({bf,...x})=>( bf ? {bf} : x ))
}


// const target = [
//     {
//         "countersign": "0",
//         "cj": 0
//     },
//     {
//         "countersign": "0",
//         "cj": 1
//     },
//     {
//         "countersign": "0",
//         "cj": 2
//     },
//     {
//         "countersign": "0",
//         "cj": 3
//     },
//     {
//         "countersign": "0",
//         "cj": 3
//     },
//     {
//         "bf": [
//             {
//                 "countersign": "1",
//                 "cj": 4
//             },
//             {
//                 "countersign": "1",
//                 "cj": 4
//             }
//         ]
//     },
//     {
//         "countersign": "1",
//         "cj": 5
//     },
//     {
//         "bf": [
//             {
//                 "countersign": "1",
//                 "cj": 4
//             },
//             {
//                 "countersign": "1",
//                 "cj": 4
//             }
//         ]
//     },
//     {
//         "bf": [
//             {
//                 "countersign": "1",
//                 "cj": 5
//             },
//             {
//                 "countersign": "1",
//                 "cj": 5
//             }
//         ]
//     },
//     {
//         "bf": [
//             {
//                 "countersign": "1",
//                 "cj": 3
//             },
//             {
//                 "countersign": "1",
//                 "cj": 3
//             },
//             {
//                 "countersign": "1",
//                 "cj": 3
//             }
//         ]
//     }
// ]


const mergeListV2 = (arrold) => {
  const arr = arrold.map(x => ({ ...x }))
  for (const index in arr) {
    let item = arr[index]
    const lastItem = arr[index - 1]
    if (item.countersign === "1") {
      if (item.cj === lastItem.cj) {
        arr[index] = { bf: [...lastItem.bf || [{ ...lastItem }], { ...item }], ...item };
        arr[index - 1] = null
      } else {
        arr[index] = { ...(item || {}), bf: [item] }
      }
    }
  }
  return arr.filter(Boolean).map(({ bf, ...x }) => (bf ? { bf } : x))
}

// targer V2
// [
//   {
//     "countersign": "0",
//     "cj": 0
//   },
//   {
//     "countersign": "0",
//     "cj": 1
//   },
//   {
//     "countersign": "0",
//     "cj": 2
//   },
//   {
//     "countersign": "0",
//     "cj": 3
//   },
//   {
//     "countersign": "0",
//     "cj": 3
//   },
//   {
//     "bf": [
//       {
//         "countersign": "1",
//         "cj": 4
//       },
//       {
//         "countersign": "1",
//         "cj": 4
//       }
//     ]
//   },
//   {
//     "bf": [
//       {
//         "countersign": "1",
//         "cj": 5
//       }
//     ]
//   },
//   {
//     "bf": [
//       {
//         "countersign": "1",
//         "cj": 4
//       },
//       {
//         "countersign": "1",
//         "cj": 4
//       }
//     ]
//   },
//   {
//     "bf": [
//       {
//         "countersign": "1",
//         "cj": 5
//       },
//       {
//         "countersign": "1",
//         "cj": 5
//       }
//     ]
//   },
//   {
//     "bf": [
//       {
//         "countersign": "1",
//         "cj": 3
//       },
//       {
//         "countersign": "1",
//         "cj": 3
//       },
//       {
//         "countersign": "1",
//         "cj": 3
//       }
//     ]
//   }
// ]



