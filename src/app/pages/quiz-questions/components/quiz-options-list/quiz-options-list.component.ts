import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonOptionComponent,
  ButtonOptionInterface,
} from '../../../../components/buttons/button-option/button-option.component';
import { TranslateModule } from '@ngx-translate/core';

export interface QuizAnswerOption {
  title: string;
  isCorrect: boolean;
}

@Component({
  selector: 'qzy-quiz-options-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonOptionComponent],
  templateUrl: './quiz-options-list.component.html',
  styleUrls: ['./quiz-options-list.component.scss'],
})
export class QuizOptionsListComponent implements OnChanges {
  @Input({ required: true }) quizId = '';
  @Input({ required: true }) questionId = '';
  @Input() answers: QuizAnswerOption[] = [];
  @Input() isLastQuestion = false;
  @Input() nextQuestionLabel = 'quizQuestions.nextQuestion';
  @Input() getScoreLabel = 'quizQuestions.getScore';
  @Input() submitAnswerLabel = 'quizQuestions.submit';
  /** Join flow: after submit, only "wait for host" (no next / get score in this control). */
  @Input() joinMode = false;
  /** Full localStorage key for score (e.g. `join-quiz-score:AKQQQG`). If unset, uses `quiz-score:${quizId}`. */
  @Input() scoreStorageKeyOverride: string | null = null;
  @Output() answerClick = new EventEmitter<QuizAnswerOption>();
  @Output() nextQuestion = new EventEmitter<void>();
  @Output() getScore = new EventEmitter<void>();

  selectedAnswerTitle: string | null = null;
  submittedAnswerTitle: string | null = null;
  isSubmitted = false;
  isAnswerCorrect = false;
  feedbackType: 'error' | 'warning' | null = null;
  feedbackMessageKey: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['questionId'] && !changes['questionId'].firstChange) {
      this.resetQuestionState();
    }
  }

  onAnswerClick(answer: QuizAnswerOption) {
    if (this.isSubmitted) {
      return;
    }
    this.selectedAnswerTitle = answer.title;
    this.clearFeedback();
    this.answerClick.emit(answer);
  }

  onSubmitOrNext() {
    if (this.isSubmitted) {
      if (this.joinMode) {
        return;
      }
      if (this.isLastQuestion) {
        this.getScore.emit();
        return;
      }
      this.nextQuestion.emit();
      return;
    }
    if (!this.selectedAnswerTitle) {
      this.showFeedback('error', 'quizQuestions.selectAnswerError');
      return;
    }

    const selected = this.answers.find(
      (a) => a.title === this.selectedAnswerTitle
    );
    this.isSubmitted = true;
    this.submittedAnswerTitle = this.selectedAnswerTitle;
    this.isAnswerCorrect = !!selected?.isCorrect;
    this.clearFeedback();
    this.persistScoreIfCorrect();
  }

  toButtonOption(answer: QuizAnswerOption, index: number): ButtonOptionInterface {
    return {
      title: answer.title,
      label: this.buildIndexLabel(index),
    };
  }

  private buildIndexLabel(index: number): string {
    return String.fromCharCode(65 + (index % 26));
  }

  isSelected(answer: QuizAnswerOption): boolean {
    return this.selectedAnswerTitle === answer.title;
  }

  isCorrect(answer: QuizAnswerOption): boolean {
    return this.isSubmitted && this.isSelected(answer) && this.isAnswerCorrect;
  }

  isIncorrect(answer: QuizAnswerOption): boolean {
    return this.isSubmitted && this.isSelected(answer) && !this.isAnswerCorrect;
  }

  /** When the user submitted a wrong option, show only the check icon on the actually correct one. */
  showCorrectAnswerIconAfterWrong(answer: QuizAnswerOption): boolean {
    return this.isSubmitted && !this.isAnswerCorrect && answer.isCorrect;
  }

  private getScoreStorageKey(): string {
    return this.scoreStorageKeyOverride ?? `quiz-score:${this.quizId}`;
  }

  private persistScoreIfCorrect() {
    if (!this.isAnswerCorrect) {
      return;
    }
    const storageKey = this.getScoreStorageKey();
    const raw = localStorage.getItem(storageKey);
    const parsed: Record<string, boolean> = raw ? JSON.parse(raw) : {};
    parsed[this.questionId] = true;
    localStorage.setItem(storageKey, JSON.stringify(parsed));
  }

  private resetQuestionState() {
    this.selectedAnswerTitle = null;
    this.submittedAnswerTitle = null;
    this.isSubmitted = false;
    this.isAnswerCorrect = false;
    this.clearFeedback();
  }

  private showFeedback(type: 'error' | 'warning', messageKey: string) {
    this.feedbackType = type;
    this.feedbackMessageKey = messageKey;
  }

  private clearFeedback() {
    this.feedbackType = null;
    this.feedbackMessageKey = null;
  }
}
