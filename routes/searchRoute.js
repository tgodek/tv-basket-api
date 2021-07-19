const { Router } = require("express");
const searchController = require("../controllers/searchController");

const router = Router();

router.get("/", searchController.search);

module.exports = router;
