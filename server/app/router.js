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
  router.resources('documents','/document',authMiddleware,controller.document)
};
