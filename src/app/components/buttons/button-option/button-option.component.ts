import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

export interface ButtonOptionInterface {
  label: string;
  title: string;
}
@Component({
  selector: 'qzy-button-option',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule],
  templateUrl: './button-option.component.html',
  styleUrls: ['./button-option.component.scss'],
})
export class ButtonOptionComponent {
  @Input() buttonOption: ButtonOptionInterface = {
    label: '',
    title: '',
  };
  @Input() isSelected = false;
  @Input() isCorrect = false;
  @Input() isIncorrect = false;
  /** After a wrong answer: show the check icon on the truly correct option without green border. */
  @Input() showCorrectResultIcon = false;
  @Input() disabled = false;

  @Output() buttonClick = new EventEmitter<void>();

  onButtonClick() {
    if (this.disabled) {
      return;
    }
    this.buttonClick.emit();
  }

  get statusIconSrc(): string | null {
    if (this.isIncorrect) {
      return 'assets/icons/icon-incorrect.svg';
    }
    if (this.isCorrect) {
      return 'assets/icons/icon-correct.svg';
    }
    if (this.showCorrectResultIcon) {
      return 'assets/icons/icon-correct.svg';
    }
    return null;
  }
}
