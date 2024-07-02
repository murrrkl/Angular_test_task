import {Component, Input, input} from '@angular/core';
import {Task} from '../../data/interfaces/task.interface';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() task_?: Task;

  private formatMinutes(minutes: number) {
    let minutesString = `${minutes} минут`;
    if (minutes % 10 === 1 && minutes !== 11) {
      minutesString += "у";
    } else if (minutes % 10 >= 2 && minutes % 10 <= 4 && !(minutes >= 12 && minutes <= 14)) {
      minutesString += "ы";
    }

    return minutesString;
  }

  private formatHours(hours: number) {
    let hoursString = `${hours} час`;
    if ((hours % 100 >= 11 && hours % 100 <= 19) || hours % 10 === 0) {
      hoursString += 'ов';
    } else if (hours % 10 === 1) {
      hoursString += '';
    } else if (hours % 10 >= 2 && hours % 10 <= 4) {
      hoursString += 'а';
    } else {
      hoursString += 'ов';
    }

    return hoursString;
  }

  private formatDays(days: number): string {
    if (days % 10 === 1 && days !== 11) {
      return `${days} день`;
    } else if (days % 10 >= 2 && days % 10 <= 4 && !(days >= 12 && days <= 14)) {
      return `${days} дня`;
    } else {
      return `${days} дней`;
    }
  }

  public getRelativeTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    const current = new Date();

    // Преобразование даты в формат UTC
    const dateTime = new Date(date.toISOString());
    const currentTime = new Date(current.toISOString());

    const diffMs = currentTime.getTime() - dateTime.getTime();
    const diffSeconds = Math.round(Math.abs(diffMs) / 1000);

    if (diffSeconds < 60) {
      return 'только что';
    }

    const diffMinutes = Math.round(diffSeconds / 60);
    if (diffMinutes < 60) {
      return `${this.formatMinutes(diffMinutes)} назад`;
    }

    const diffHours = Math.round(diffMinutes / 60);
    if (diffHours < 24) {
      return `${this.formatHours(diffHours)} назад`;
    }

    const diffDays = Math.round(diffHours / 24);
    return `${this.formatDays(diffDays)} назад`;
  }
}
