import { Component, OnInit } from '@angular/core';
import { GreenService } from './green.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  settings: any;
  stateInstance: string = '';
  chatId: string = '';
  message: string = '';
  messageId: string = '';
  messageIdU: string = '';
  urlFile: string = '';
  fileName: string = '';
  caption: string = '';
  chatIdU: any;

  constructor(private settingsService: GreenService) {}

  ngOnInit(): void {}

  fetchSettings(): void {
    this.clearResults();
    this.settingsService.getSettings().subscribe(
      (data) => {
        this.settings = data;
        console.log('Settings:', this.settings);
      },
      (error) => {
        console.error('Error fetching settings:', error);
      }
    );
  }

  fetchStateInstance(): void {
    this.clearResults();
    this.settingsService.getStateInstance().subscribe(
      (data) => {
        this.stateInstance = data.stateInstance;
        console.log('State Instance:', this.stateInstance);
      },
      (error) => {
        console.error('Error fetching state instance:', error);
      }
    );
  }

  sendMessage(): void {
    this.clearResults();
    if (!this.chatId || !this.message) {
      console.error('Chat ID and message are required');
      return;
    }
    const fullChatId = `${this.chatId}@c.us`; // Добавляем суффикс @c.us
    this.settingsService.sendMessage(fullChatId, this.message).subscribe(
      (response) => {
        this.messageId = response.idMessage;
        console.log('Message sent with ID:', this.messageId);
      },
      (error) => {
        console.error('Error sending message:', error);
      }
    );
  }

  sendFile(): void {
    this.clearResults();
    if (!this.chatIdU || !this.urlFile || !this.fileName) {
      console.error('Chat ID, URL file, and file name are required');
      return;
    }
    if (this.chatIdU && !this.chatIdU.endsWith('@c.us')) {
      this.chatIdU += '@c.us';
    }

    this.settingsService.sendFileByUrl(this.chatIdU, this.urlFile, this.fileName, this.caption).subscribe(
      (response) => {
        this.messageIdU = response.idMessage;
        console.log('File sent with ID:', response.idMessage);
      },
      (error) => {
        console.error('Error sending file:', error);
      }
    );
  }

  clearResults(): void {
    this.settings = null;
    this.stateInstance = '';
    this.messageId = '';
    this.messageIdU = '';
  }
}
