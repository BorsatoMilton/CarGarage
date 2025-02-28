import { Router } from "express";
import { findAllFaq, addFAQ, updateFAQ, deleteFAQ, sanitizeFaqInput } from "./faq.controller.js";

export const faqRouter = Router();

faqRouter.get("/", findAllFaq);
faqRouter.post("/", sanitizeFaqInput, addFAQ);
faqRouter.put("/:id", sanitizeFaqInput, updateFAQ);
faqRouter.delete("/:id", deleteFAQ);