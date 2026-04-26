import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'qzy-quiz-progress-bar',
  standalone: true,
  templateUrl: './quiz-progress-bar.component.html',
  styleUrls: ['./quiz-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizProgressBarComponent {
  @Input() value = 0;
  @Input() max = 1;
  @Input() ariaLabel = 'Quiz progress';

  get safeMax(): number {
    return this.max > 0 ? this.max : 1;
  }

  get safeValue(): number {
    return Math.min(Math.max(this.value, 0), this.safeMax);
  }

  get progressPercent(): number {
    return (this.safeValue / this.safeMax) * 100;
  }
}
