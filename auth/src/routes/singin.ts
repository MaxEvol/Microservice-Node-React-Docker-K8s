import express from "express";

const router = express.Router();

router.post("/api/users/singin", (req, res) => {
  const { email, password } = req.body;

  res.send("Solicitando singin ");
});

export { router as singinRouter };
