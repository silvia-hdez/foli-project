const router = require("express").Router();
const authController = require("../controllers/auth.controller.");
const usersController = require("../controllers/users.controller");

const authMiddleware = require("../middelwares/auth.middelware");

const plantsController = require("../controllers/plants.controller");

const postController = require("../controllers/post.contoller.js");
const commentController = require("../controllers/comment.controller")
const upload = require("../config/storage.config");

//---User routes---//

router.get("/users/me", usersController.getCurrentUser);
router.post("/users/edit", upload.single("image"), usersController.edit);
router.post('/users/:userId/follow', usersController.followUser)
router.post('/users/:userId/unFollow', usersController.unFollowUser)
router.get("/users/:userId/following", usersController.getFollowing)
router.get("/users/:userId/followers",	usersController.getFollowers)
router.get('/users/:userId', usersController.getInfoUser)

//--- Plants routes ---//
router.get("/plants", plantsController.getAllPlants);
router.get("/plants/:id", plantsController.detailPlant);

//---Bookmarks---//
router.post("/plants/save/:plantId", plantsController.save);
router.get("/save-plants", plantsController.listSavePlants);
router.delete("/saves/:saveId", plantsController.delete);

router.post("/posts/save/:postId", postController.save);
router.get("/save-posts", postController.listSavePost);
router.delete("/posts/:postId", postController.delete);

//--- Post routes ---//
router.post("/new-post", upload.any(), postController.create);
router.get("/posts", postController.listPosts);
router.get("/my-posts", postController.listMyPosts);
router.get("/posts/:id", postController.detailPost);
router.patch("/posts/:postId", upload.any(), postController.edit);
router.delete("/posts/:postId", postController.delete);


module.exports = router;

//---Logout---//
router.get("/logout", authController.logout);

//---Comments routes---//
router.post('/new-comment', commentController.create)
router.delete('/:commentId', commentController.deleteComment)
router.patch('/:commentId', commentController.editComment)
router.get('/comments', commentController.getComments)
