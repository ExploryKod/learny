import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'qzy-quiz-score-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './quiz-score-card.component.html',
  styleUrl: './quiz-score-card.component.scss',
})
export class QuizScoreCardComponent {
  @Input() quizTitle = '';
  @Input() quizIcon = 'assets/icons/icon-html.svg';
  @Input() correctAnswers = 0;
  @Input() totalQuestions = 0;

  get iconBadgeClass(): string {
    const iconPath = this.quizIcon.toLowerCase();
    if (iconPath.includes('icon-html')) {
      return 'quiz-score-card__header-icon-badge--html';
    }
    if (iconPath.includes('icon-css')) {
      return 'quiz-score-card__header-icon-badge--css';
    }
    if (iconPath.includes('icon-js')) {
      return 'quiz-score-card__header-icon-badge--js';
    }
    if (iconPath.includes('icon-accessibility')) {
      return 'quiz-score-card__header-icon-badge--accessibility';
    }
    return 'quiz-score-card__header-icon-badge--default';
  }
}
