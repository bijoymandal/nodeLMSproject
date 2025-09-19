// utils/response.js
export const success = (res, data = {}, message = "Success", code = 200) => {
  return res.status(code).json({
    success: true,
    message,
    data,
  });
};

export const error = (res, message = "Something went wrong", code = 500, details = null) => {
  return res.status(code).json({
    success: false,
    message,
    error: details,
  });
};

// ---- Specific Error Helpers ----
export const badRequest = (res, message = "Bad request", details = null) =>
  error(res, message, 400, details);

export const forbidden = (res, message = "Forbidden", details = null) =>
  error(res, message, 403, details);

export const expired = (res, message = "Session expired", details = null) =>
  error(res, message, 419, details);

export const notFound = (res, message = "Not found", details = null) =>
  error(res, message, 404, details);

export const serverError = (res, message = "Internal server error", details = null) =>
  error(res, message, 500, details);
