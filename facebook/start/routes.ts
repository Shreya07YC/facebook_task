/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import PagesController from '#controllers/pages_controller'
import CommentsController from '#controllers/comments_controller'
import LikesController from '#controllers/likes_controller'
import SharesController from '#controllers/shares_controller'
import PostsController from '#controllers/posts_controller'
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'


router.group(() => {
router.post('/users',[UsersController,'store'])
router.get('/users',[UsersController,'index'])
router.get('/users/:id',[UsersController,'show'])
router.put('/users/:id',[UsersController,'update'])
router.delete('/users/:id',[UsersController,'delete'])
}).prefix('/api')

router.group(() => {
router.post('/pages',[PagesController,'store'])
router.get('/pages',[PagesController,'index'])
router.get('/pages/:id',[PagesController,'show'])
router.put('/pages/:id',[PagesController,'update'])
router.delete('/pages/:id',[PagesController,'delete'])
router.get('/pdfdownload',[PagesController,'pdfdownload'])
}).prefix('/api')

router.group(() => {
router.post('/posts',[PostsController,'store'])
router.get('/posts',[PostsController,'index'])
router.get('/posts/:id',[PostsController,'show'])
router.put('/posts/:id',[PostsController,'update'])
router.delete('/posts/:id',[PostsController,'delete'])
router.get('/export', [PostsController, 'export'])
}).prefix('/api')

router.group(() => {
router.post('/Likes',[LikesController,'store'])
router.get('/Likes',[LikesController,'index'])
router.get('/Likes/:id',[LikesController,'show'])
router.put('/Likes/:id',[LikesController,'update'])
router.delete('/Likes/:id',[LikesController,'delete'])
}).prefix('/api')

router.group(() => {
router.post('/Comments',[CommentsController,'store'])
router.get('/Comments',[CommentsController,'index'])
router.get('/Comments/:id',[CommentsController,'show'])
router.put('/Comments/:id',[CommentsController,'update'])
router.delete('/Comments/:id',[CommentsController,'delete'])
}).prefix('/api')

router.group(() => {
router.get('/Shares',[SharesController,'index'])
router.get('/Shares/:id',[SharesController,'show'])
router.post('/Shares',[SharesController,'store'])
router.put('/Shares/:id',[SharesController,'update'])
router.delete("/Shares/:id",[SharesController,'delete'])
}).prefix('/api')