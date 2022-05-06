import express from "express"
import { NodemailerMailAdapter } from "./adapters/nodemailer/NodemailerMailAdapter"
import { PrismaFeedbackRepository } from "./repositories/prisma/PrismaFeedbackRepository"
import { SubmitFeedbackUseCase } from "./use-cases/SubmitFeedbackUseCase"

export const routes = express.Router()

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body

  const prismaFeedbackRepository = new PrismaFeedbackRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter()

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailAdapter
  )

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  })

  return res.status(201).send()
})
