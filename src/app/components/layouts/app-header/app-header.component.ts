import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'qzy-app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
})
export class AppHeaderComponent {
  @Input() showQuizMeta = true;
  @Input() quizTitle = '';
  @Input() quizIcon = 'assets/icons/icon-html.svg';
  @Input() isDarkMode = false;
  @Output() themeModeChange = new EventEmitter<boolean>();

  onToggle(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.themeModeChange.emit(isChecked);
  }

  get iconBadgeClass(): string {
    const iconPath = this.quizIcon.toLowerCase();
    if (iconPath.includes('icon-html')) {
      return 'app-header__icon-badge--html';
    }
    if (iconPath.includes('icon-css')) {
      return 'app-header__icon-badge--css';
    }
    if (iconPath.includes('icon-js')) {
      return 'app-header__icon-badge--js';
    }
    if (iconPath.includes('icon-accessibility')) {
      return 'app-header__icon-badge--accessibility';
    }
    return 'app-header__icon-badge--default';
  }
}
