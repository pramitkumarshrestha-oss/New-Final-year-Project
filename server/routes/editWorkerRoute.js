const express = require("express");
const router = express.Router();
const { editWorker, deleteWorker } = require("../controls/editWorker");
router.post("/editWorker", editWorker);
router.post("/deleteWorker", deleteWorker);
module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { editWorker, deleteWorker } = require("../controls/editWorker");

// // Route for editing a worker (use PUT or PATCH for updates)
// router.put("/workers/:id", editWorker);

// // Route for deleting a worker (use DELETE for deleting resources)
// router.delete("/workers/:id", deleteWorker);

// module.exports = router;
