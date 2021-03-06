import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const submitFeedback = new SubmitFeedbackUseCase(
    { create: async () => {} },
    { sendMail: async () => {} }
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Ta tudo bugado',
            screenshot: 'data:image/png;base64,fsdfsdfds'
        })).resolves.not.toThrow();
    });

    it('should not be able to submit feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'Ta tudo bugado',
            screenshot: 'data:image/png;base64,fsdfsdfds'
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,fsdfsdfds'
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'sadsadsa',
            screenshot: '123.png'
        })).rejects.toThrow();
    });
});