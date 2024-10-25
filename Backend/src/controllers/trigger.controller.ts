import { Request, Response } from "express";
import { setupTrigger } from "../services/triggerService";

export const createTrigger = async (req: Request, res: Response) => {
  try {
    const { email, city, parameter, triggerValue, isAbove } = req.body;

    if (
      !email ||
      !city ||
      !parameter ||
      triggerValue === undefined ||
      isAbove === undefined
    ) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const trigger = await setupTrigger(
      email,
      city,
      parameter,
      triggerValue,
      isAbove
    );
    res.status(201).json(trigger);
  } catch (error) {
    console.error("Error creating trigger:", error);
    res.status(500).json({ error: "Failed to create trigger" });
  }
};
