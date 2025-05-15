const logService = require('../services/logService');

const withLogging = (actionType, serviceFn) => {
  return async (args, user) => {
    const result = await serviceFn(args, user);

    await logService.createLog({
      authorUserId: user._id,
      actionType,
      taskId: result._id || args.id || args.taskId
    });

    return result;
  };
};

module.exports = withLogging;
