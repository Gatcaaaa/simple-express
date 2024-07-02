const express = require("express");
const jwt = require("jsonwebtoken");

const verifiyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Unauthenticated." });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "invalid Token" });
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifiyToken;
