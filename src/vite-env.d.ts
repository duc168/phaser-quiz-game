/// <reference types="vite/client" />
interface IQuiz {
    order: number
    total: number
    question: string
    choices: string[]
    answer: number
}