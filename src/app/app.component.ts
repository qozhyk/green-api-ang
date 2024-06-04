import { Component, OnInit } from '@angular/core';
import { GreenService } from './green.service';
import { HttpErrorResponse } from '@angular/common/http';


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

  idInstance: string = '';
  apiTokenInstance: string = '';

  errorMessage: string = ''; // Add a property to hold error message


  constructor(private greenService: GreenService) {} // Inject GreenService into the constructor

  ngOnInit(): void {}

  fetchSettings(): void {
    if (!this.idInstance || !this.apiTokenInstance) {
      this.errorMessage = 'Проверьте пожалуйста Token & ID Инстации'; // Set error message
      return;
    }

    this.greenService.setCredentials(this.idInstance, this.apiTokenInstance);
    this.greenService.getSettings().subscribe(
      (data: any) => {
        this.settings = data;
        console.log('Settings:', data);
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = 'Error fetching settings: ' + error.statusText; // Set error message
        console.error('Error fetching settings:', error);
      }
    );
  }

  sendMessage(): void {
    this.clearResults();
    if (!this.chatId || !this.message) {
      console.error('Chat ID and message are required');
      return;
    }
    const fullChatId = `${this.chatId}@c.us`;
    this.greenService.sendMessage(fullChatId, this.message).subscribe(
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

    this.greenService.sendFileByUrl(this.chatIdU, this.urlFile, this.fileName, this.caption).subscribe(
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
