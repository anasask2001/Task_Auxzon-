"use strict";
const errorHandler = (error, req, res, next) => {
  console.log("Error:", error);

  if (error.statusCode) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  if (error.code === 11000) {
    const keyName = Object.keys(error.keyValue ?? {})[0];
    return res
      .status(400)
      .json({ message: `Given ${keyName} already exists.` });
  }

  console.log("Unhandled Error:", error);
  return res.status(500).json({ message: "An unexpected error occurred." });
};

export { errorHandler };
