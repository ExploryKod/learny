import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';


export interface ButtonQuizInterface {
  icon: string;
  title: string;
}

export interface ButtonQuizAction {
  key: string;
  icon: string;
  ariaLabel: string;
  isVisible?: boolean;
}

@Component({
  selector: 'qzy-button-quiz',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule],
  templateUrl: './button-quiz.component.html',
  styleUrl: './button-quiz.component.scss',
})
export class ButtonQuizComponent {
  @Input() buttonQuiz: ButtonQuizInterface = {
    icon: '',
    title: '',
  };

  @Input() actions: ButtonQuizAction[] = [];
  @Output() buttonClick = new EventEmitter<void>();
  @Output() actionClick = new EventEmitter<string>();

  onButtonClick() {
    if (this.hasActions) {
      return;
    }
    this.buttonClick.emit();
  }

  onActionClick(actionKey: string, event: MouseEvent) {
    event.stopPropagation();
    this.actionClick.emit(actionKey);
  }

  get visibleActions(): ButtonQuizAction[] {
    return this.actions.filter((action) => action.isVisible !== false);
  }

  get hasActions(): boolean {
    return this.visibleActions.length > 0;
  }

  get iconBadgeClass(): string {
    const iconPath = this.buttonQuiz.icon.toLowerCase();
    if (iconPath.includes('icon-html')) {
      return 'button-quiz__icon--html';
    }
    if (iconPath.includes('icon-css')) {
      return 'button-quiz__icon--css';
    }
    if (iconPath.includes('icon-js')) {
      return 'button-quiz__icon--js';
    }
    if (iconPath.includes('icon-accessibility')) {
      return 'button-quiz__icon--accessibility';
    }
    return 'button-quiz__icon--default';
  }
}
