export interface Slide {
    id: string;
    text: string;
    image: string;
    duration?: number;
}

export interface Question {
    id: string;
    type: "choice";
    question: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
    image?: string;
}

export interface PracticalTask {
    id: string;
    title: string;
    instruction: string;
    items?: { text: string; image: string }[]; // For fabric guessing
    duration?: number; // For timed tasks
}

export interface GameContent {
    intro: {
        title: string;
        subtitle: string;
        slides: Slide[];
    };
    exam: {
        title: string;
        introText: string;
        questions: Question[];
    };
    practical: {
        title: string;
        tasks: PracticalTask[];
    };
    result: {
        successTitle: string;
        successMessage: string;
        certificateImage: string;
    };
}
