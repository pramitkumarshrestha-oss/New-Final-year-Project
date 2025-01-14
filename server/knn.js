const dataset = [
  {
    totalNumberOfWorks: 3,
    popularity: 1,
    averageTimeTaken: 5,
    available: "yes",
  },
  {
    totalNumberOfWorks: 11,
    popularity: 2,
    averageTimeTaken: 15,
    available: "no",
  },
  {
    totalNumberOfWorks: 9,
    popularity: 1,
    averageTimeTaken: 10,
    available: "yes",
  },
  {
    totalNumberOfWorks: 4,
    popularity: 2,
    averageTimeTaken: 7,
    available: "yes",
  },
  {
    totalNumberOfWorks: 14,
    popularity: 3,
    averageTimeTaken: 20,
    available: "no",
  },
  {
    totalNumberOfWorks: 8,
    popularity: 1,
    averageTimeTaken: 12,
    available: "yes",
  },
  {
    totalNumberOfWorks: 2,
    popularity: 4,
    averageTimeTaken: 4,
    available: "yes",
  },
  {
    totalNumberOfWorks: 6,
    popularity: 3,
    averageTimeTaken: 8,
    available: "yes",
  },
  {
    totalNumberOfWorks: 12,
    popularity: 2,
    averageTimeTaken: 18,
    available: "no",
  },
  {
    totalNumberOfWorks: 13,
    popularity: 5,
    averageTimeTaken: 22,
    available: "no",
  },
  {
    totalNumberOfWorks: 0,
    popularity: 5,
    averageTimeTaken: 3,
    available: "yes",
  },
  {
    totalNumberOfWorks: 10,
    popularity: 4,
    averageTimeTaken: 16,
    available: "no",
  },
  {
    totalNumberOfWorks: 5,
    popularity: 1,
    averageTimeTaken: 6,
    available: "yes",
  },
  {
    totalNumberOfWorks: 15,
    popularity: 3,
    averageTimeTaken: 25,
    available: "no",
  },
  {
    totalNumberOfWorks: 7,
    popularity: 2,
    averageTimeTaken: 9,
    available: "yes",
  },
  {
    totalNumberOfWorks: 6,
    popularity: 4,
    averageTimeTaken: 7,
    available: "yes",
  },
  {
    totalNumberOfWorks: 2,
    popularity: 5,
    averageTimeTaken: 5,
    available: "yes",
  },
  {
    totalNumberOfWorks: 9,
    popularity: 3,
    averageTimeTaken: 11,
    available: "yes",
  },
  {
    totalNumberOfWorks: 8,
    popularity: 2,
    averageTimeTaken: 10,
    available: "yes",
  },
  {
    totalNumberOfWorks: 3,
    popularity: 1,
    averageTimeTaken: 5,
    available: "yes",
  },
  {
    totalNumberOfWorks: 11,
    popularity: 5,
    averageTimeTaken: 15,
    available: "no",
  },
  {
    totalNumberOfWorks: 14,
    popularity: 3,
    averageTimeTaken: 20,
    available: "no",
  },
  {
    totalNumberOfWorks: 13,
    popularity: 4,
    averageTimeTaken: 21,
    available: "no",
  },
  {
    totalNumberOfWorks: 10,
    popularity: 2,
    averageTimeTaken: 17,
    available: "no",
  },
  {
    totalNumberOfWorks: 1,
    popularity: 4,
    averageTimeTaken: 2,
    available: "yes",
  },
  {
    totalNumberOfWorks: 4,
    popularity: 1,
    averageTimeTaken: 6,
    available: "yes",
  },
  {
    totalNumberOfWorks: 7,
    popularity: 3,
    averageTimeTaken: 9,
    available: "yes",
  },
  {
    totalNumberOfWorks: 12,
    popularity: 5,
    averageTimeTaken: 19,
    available: "no",
  },
  {
    totalNumberOfWorks: 15,
    popularity: 4,
    averageTimeTaken: 25,
    available: "no",
  },
  {
    totalNumberOfWorks: 5,
    popularity: 1,
    averageTimeTaken: 7,
    available: "yes",
  },
  {
    totalNumberOfWorks: 8,
    popularity: 2,
    averageTimeTaken: 10,
    available: "yes",
  },
  {
    totalNumberOfWorks: 0,
    popularity: 1,
    averageTimeTaken: 3,
    available: "yes",
  },
  {
    totalNumberOfWorks: 0,
    popularity: 2,
    averageTimeTaken: 4,
    available: "yes",
  },
  {
    totalNumberOfWorks: 0,
    popularity: 3,
    averageTimeTaken: 5,
    available: "yes",
  },
  {
    totalNumberOfWorks: 0,
    popularity: 4,
    averageTimeTaken: 2,
    available: "yes",
  },
  {
    totalNumberOfWorks: 0,
    popularity: 5,
    averageTimeTaken: 3,
    available: "yes",
  },
];

// Define the number of nearest neighbors to consider
const k = 3;

// Function to calculate the Euclidean distance between two points
function euclideanDistance(point1, point2) {
  const totalNumberOfWorksDiff =
    point1.totalNumberOfWorks - point2.totalNumberOfWorks;
  const popularityDiff = point1.popularity - point2.popularity;
  const averageTimeTakenDiff =
    point1.averageTimeTaken - point2.averageTimeTaken;

  return Math.sqrt(
    totalNumberOfWorksDiff ** 2 +
      popularityDiff ** 2 +
      averageTimeTakenDiff ** 2
  );
}

// Function to find the k nearest neighbors
function findNearestNeighbors(testPoint, dataset, k) {
  // Calculate distances between test point and dataset
  const distances = dataset.map((point) => ({
    point,
    distance: euclideanDistance(testPoint, point),
  }));

  // Sort by distance
  distances.sort((a, b) => a.distance - b.distance);

  // Return the k nearest neighbors
  return distances.slice(0, k).map((distance) => distance.point);
}

// Function to predict availability based on k nearest neighbors
function predict(totalNumberOfWorks, popularity, averageTimeTaken) {
  const testPoint = { totalNumberOfWorks, popularity, averageTimeTaken };
  const nearestNeighbors = findNearestNeighbors(testPoint, dataset, k);

  // Count occurrences of 'available' in neighbors
  const counts = nearestNeighbors.reduce((acc, neighbor) => {
    acc[neighbor.available] = acc[neighbor.available]
      ? acc[neighbor.available] + 1
      : 1;
    return acc;
  }, {});

  // Find the most frequent availability
  const predictedAvailable = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );

  return predictedAvailable;
}

module.exports = predict;
