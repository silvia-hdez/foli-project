const router = require("express").Router();
const authController = require("../controllers/auth.controller.");
const usersController = require("../controllers/users.controller");

const authMiddleware = require("../middelwares/auth.middelware");

const plantsController = require("../controllers/plants.controller");

const postController = require("../controllers/post.contoller.js");
const upload = require("../config/storage.config");

router.get("/users/me", usersController.getCurrentUser);
//router.post("/users/:id/edit", upload.single("image"), usersController.edit);
router.post("/users/:id/edit", usersController.edit);


//--- Plants routes ---//
router.get("/plants", plantsController.getAllPlants);
router.get("/plants/:id", plantsController.detailPlant);

//---Bookmarks---//
router.post("/plants/save/:plantId", plantsController.save);
router.get("/save-plants", plantsController.listSavePlants);
router.post("/saves/:saveId/delete", plantsController.delete);
router.get('/my-saves', plantsController.listMyPlantsSaves)

//--- Post routes ---//
router.post("/new-post", upload.any(), postController.create);
router.get("/posts", postController.listPosts);
router.get("/my-posts", postController.listMyPosts);
router.get("/posts/:id", postController.detailPost);
router.post("/posts/:id/edit", upload.array("image"), postController.edit);
router.post("/posts/:id/delete", postController.delete);

module.exports = router;

//---Logout---//
router.get('/logout', authController.logout)
