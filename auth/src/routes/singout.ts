import express from "express";

const router = express.Router();

router.post("/api/users/singout", (req, res) => {
  req.session = null;
  return res.send({});
});

export { router as singoutRouter };
