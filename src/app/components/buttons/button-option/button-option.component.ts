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
  styleUrl: './button-option.component.scss',
})
export class ButtonOptionComponent {
  @Input() buttonOption: ButtonOptionInterface = {
    label: '',
    title: '',
  };
  @Input() isSelected = false;
  @Input() isCorrect = false;
  @Input() isIncorrect = false;
  @Input() disabled = false;

  @Output() buttonClick = new EventEmitter<void>();

  onButtonClick() {
    if (this.disabled) {
      return;
    }
    this.buttonClick.emit();
  }

  get statusIconSrc(): string | null {
    if (this.isCorrect) {
      return 'assets/icons/icon-correct.svg';
    }
    if (this.isIncorrect) {
      return 'assets/icons/icon-incorrect.svg';
    }
    return null;
  }
}
