export interface Game {
    id?: number;
    name: string;
    author: string;
    rules: Rule[];
}

export interface Rule {
    id?: number;
    divisor: number;
    replacementText: string;
}

export interface CreateGameDto {
    name: string;
    author: string;
    rules: { divisor: number; replacementText: string }[];
}

export interface UpdateGameDto extends CreateGameDto {
    id: number;
}

export interface GameSessionResponse {
    sessionId: string;
    number: number;
    rules: Array<{
        divisor: number;
        replacementText: string;
    }>;
}

export interface SubmitAnswerResponse {
    correct: boolean;
    correctAnswer: string;
    score: {
        correctCount: number;
        incorrectCount: number;
    };
    nextNumber: number | null;
}

export interface SubmitAnswerRequest {
    answer: string;
}  