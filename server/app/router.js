'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const authMiddleware = app.middleware.auth()
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.resources('users', '/user', controller.user);
  router.post('/login',controller.user.login)
  router.get('/document',controller.document.index)
  router.get('/document/:id',controller.document.show)
  router.put('/document/:id',authMiddleware,controller.document.update)
  router.post('/document',authMiddleware,controller.document.create)
  router.post('/upload',controller.upload.upload)
  router.delete('/document/:id',controller.document.delete)
};
