/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import PagesController from '#controllers/pages_controller'
import PostCommentsController from '#controllers/post_comments_controller'
import PostLikesController from '#controllers/post_likes_controller'
import PostSharesController from '#controllers/post_shares_controller'
import PostsController from '#controllers/posts_controller'
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'

router.post('/users',[UsersController,'store'])
router.get('/users',[UsersController,'index'])
router.get('/users/:id',[UsersController,'show'])
router.put('/users/:id',[UsersController,'update'])
router.delete('/users/:id',[UsersController,'delete'])

router.post('/pages',[PagesController,'store'])
router.get('/pages',[PagesController,'index'])
router.get('/pages/:id',[PagesController,'show'])
router.put('/pages/:id',[PagesController,'update'])
router.delete('/pages/:id',[PagesController,'delete'])

router.post('/posts',[PostsController,'store'])
router.get('/posts',[PostsController,'index'])
router.get('/posts/:id',[PostsController,'show'])
router.put('/posts/:id',[PostsController,'update'])
router.delete('/posts/:id',[PostsController,'delete'])

router.post('/postlikes',[PostLikesController,'store'])
router.get('/postlikes',[PostLikesController,'index'])
router.get('/postlikes/:id',[PostLikesController,'show'])
router.put('/postlikes/:id',[PostLikesController,'update'])
router.delete('/postlikes/:id',[PostLikesController,'delete'])

router.post('/postcomments',[PostCommentsController,'store'])
router.get('/postcomments',[PostCommentsController,'index'])
router.get('/postcomments/:id',[PostCommentsController,'show'])
router.put('/postcomments/:id',[PostCommentsController,'update'])
router.delete('/postcomments/:id',[PostCommentsController,'delete'])

router.get('/postshares',[PostSharesController,'index'])
router.get('/postshares/:id',[PostSharesController,'show'])
router.post('/postshares',[PostSharesController,'store'])
router.put('/postshares/:id',[PostSharesController,'update'])
router.delete("/postshares/:id",[PostSharesController,'delete'])