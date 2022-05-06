import { SubmitFeedbackUseCase } from "./SubmitFeedbackUseCase"

const createFeedbackSpy = jest.fn()
const sendEmailFeedbackSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendEmailFeedbackSpy }
)

describe("submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "some comment",
        screenshot: "data:image/png;base64/image",
      })
    ).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendEmailFeedbackSpy).toHaveBeenCalled()
  })

  it("should not be able to submit a feedback without a type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "some comment",
      })
    ).rejects.toThrow()
  })

  it("should not be able to submit a feedback without a comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
      })
    ).rejects.toThrow()
  })

  it("should not be able to submit a feedback with an invalid screenshot type", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "some comment",
        screenshot: "teste.jpg",
      })
    ).rejects.toThrow()
  })
})
