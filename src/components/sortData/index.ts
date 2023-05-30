// Sample array of objects
const array: { id: string; parentid: string | null; createdDate: Date }[] = [
  { id: "A", parentid: null, createdDate: new Date("2023-05-01") },
  { id: "B", parentid: "X", createdDate: new Date("2023-05-03") },
  { id: "C", parentid: null, createdDate: new Date("2023-05-02") },
  { id: "D", parentid: "X", createdDate: new Date("2023-05-03") },
  { id: "E", parentid: null, createdDate: new Date("2023-05-04") },
];

// Custom sorting function
export function customSort(
  a: { id: string; parentid: string | null; createdDate: Date },
  b: { id: string; parentid: string | null; createdDate: Date }
): number {
  // Sort by createdDate in ascending order
  if (a.createdDate < b.createdDate) {
    return -1;
  }
  if (a.createdDate > b.createdDate) {
    return 1;
  }

  // If parentid exists, group objects with the same parentid together
  if (a.parentid && b.parentid && a.parentid === b.parentid) {
    return 0;
  }

  return 0;
}

// Sort the array using the custom sorting function
array.sort(customSort);

// Output the sorted and grouped array
console.log(array.map(obj => obj.id));
