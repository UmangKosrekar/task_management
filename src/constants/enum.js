exports.userEnum = Object.freeze({
  role: {
    ADMIN: "admin",
    MANAGER: "manager",
    USER: "user"
  }
});

exports.taskEnum = Object.freeze({
  status: {
    PENDING: "pending",
    IN_PROGRESS: "inProgress",
    COMPLETED: "completed"
  },
  priority: {
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high"
  }
});

exports.errorCodes = Object.freeze({
  VALIDATION_ERROR: "VALIDATION_ERROR",
  BAD_REQUEST: "BAD_REQUEST",
  UNAUTHORIZED: "UNAUTHORIZED"
});
