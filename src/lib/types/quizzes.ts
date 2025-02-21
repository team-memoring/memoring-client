export interface QuizPair {
  Basic_quizzes: Omit<Quiz, 'is_dummy'>;
  Dummy_quizzes: Omit<Quiz, 'is_dummy'>;
}

export interface Quiz {
  id: number;
  quiz: string;
  option: string[];
  answer: string;
  imageUrl: string | null;
  isDummy: boolean;
}

export interface QuizStorage {
  quiz_question: string;
  quiz_completion_state: number;
  user_answer: string | null;
  quiz_choice_1: string;
  quiz_choice_2: string;
  quiz_choice_3: string;
  quiz_answer: string;
  quiz_img: string | null;
  is_dummy: boolean;
  is_correct: boolean | null;
  memory_id: number;
  family_id: number;
}
