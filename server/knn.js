// Define the dataset
const dataset = [
  { totalNumberOfWorks: 3, popularity: 1, available: "yes" },
  { totalNumberOfWorks: 11, popularity: 2, available: "no" },
  { totalNumberOfWorks: 9, popularity: 1, available: "yes" },
  { totalNumberOfWorks: 4, popularity: 2, available: "yes" },
  { totalNumberOfWorks: 14, popularity: 3, available: "no" },
  { totalNumberOfWorks: 8, popularity: 1, available: "yes" },
  { totalNumberOfWorks: 2, popularity: 4, available: "yes" },
  { totalNumberOfWorks: 6, popularity: 3, available: "yes" },
  { totalNumberOfWorks: 12, popularity: 2, available: "no" },
  { totalNumberOfWorks: 13, popularity: 5, available: "no" },
  { totalNumberOfWorks: 0, popularity: 5, available: "yes" },
  { totalNumberOfWorks: 10, popularity: 4, available: "no" },
  { totalNumberOfWorks: 5, popularity: 1, available: "yes" },
  { totalNumberOfWorks: 15, popularity: 3, available: "no" },
  { totalNumberOfWorks: 7, popularity: 2, available: "yes" },
  { totalNumberOfWorks: 6, popularity: 4, available: "yes" },
  { totalNumberOfWorks: 2, popularity: 5, available: "yes" },
  { totalNumberOfWorks: 9, popularity: 3, available: "yes" },
  { totalNumberOfWorks: 8, popularity: 2, available: "yes" },
  { totalNumberOfWorks: 3, popularity: 1, available: "yes" },
  { totalNumberOfWorks: 11, popularity: 5, available: "no" },
  { totalNumberOfWorks: 14, popularity: 3, available: "no" },
  { totalNumberOfWorks: 13, popularity: 4, available: "no" },
  { totalNumberOfWorks: 10, popularity: 2, available: "no" },
  { totalNumberOfWorks: 1, popularity: 4, available: "yes" },
  { totalNumberOfWorks: 4, popularity: 1, available: "yes" },
  { totalNumberOfWorks: 7, popularity: 3, available: "yes" },
  { totalNumberOfWorks: 12, popularity: 5, available: "no" },
  { totalNumberOfWorks: 15, popularity: 4, available: "no" },
  { totalNumberOfWorks: 5, popularity: 1, available: "yes" },
  { totalNumberOfWorks: 8, popularity: 2, available: "yes" },
  { totalNumberOfWorks: 0, popularity: 1, available: "yes" },
  { totalNumberOfWorks: 0, popularity: 2, available: "yes" },
  { totalNumberOfWorks: 0, popularity: 3, available: "yes" },
  { totalNumberOfWorks: 0, popularity: 4, available: "yes" },
  { totalNumberOfWorks: 0, popularity: 5, available: "yes" },
];

// Define the number of nearest neighbors to consider
const k = 3;

// Define a function to calculate the Euclidean distance between two points
function euclideanDistance(point1, point2) {
  const totalNumberOfWorksDiff =
    point1.totalNumberOfWorks - point2.totalNumberOfWorks;
  const popularityDiff = point1.popularity - point2.popularity;
  return Math.sqrt(totalNumberOfWorksDiff ** 2 + popularityDiff ** 2);
}

// Define a function to find the k nearest neighbors
function findNearestNeighbors(testPoint, dataset, k) {
  // Calculate the distances between the test point and each point in the dataset
  const distances = dataset.map((point) => ({
    point,
    distance: euclideanDistance(testPoint, point),
  }));

  // Sort the distances in ascending order
  distances.sort((a, b) => a.distance - b.distance);

  // Return the k nearest neighbors
  return distances.slice(0, k).map((distance) => distance.point);
}

// Define a function to make a prediction based on the k nearest neighbors
function predict(totalNumberOfWorks, popularity) {
  const testPoint = { totalNumberOfWorks, popularity };
  // Find the k nearest neighbors
  const nearestNeighbors = findNearestNeighbors(testPoint, dataset, k);

  // Count the number of each available among the nearest neighbors
  const counts = nearestNeighbors.reduce((acc, neighbor) => {
    acc[neighbor.available] = acc[neighbor.available]
      ? acc[neighbor.available] + 1
      : 1;
    return acc;
  }, {});

  // Find the available with the highest count
  const predictedAvailable = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );

  // Return the predicted available
  return predictedAvailable;
}

module.exports = predict;

// // Test the algorithm with a new point
// let totalNumberOfWorks = 10;
// let popularity = 1;
// // const newPoint = { totalNumberOfWorks: 9, popularity: 5 };
// const prediction = predict(totalNumberOfWorks, popularity);
// console.log(
//   `The prediction for (${totalNumberOfWorks}, ${popularity}) is ${prediction}`
// );
