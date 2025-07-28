import { Component, inject, signal } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

import { FormsModule, NgForm } from '@angular/forms'
 
import { HttpClient } from '@angular/common/http';

// interface for the ([get] request)
interface FetchResponse {
  email: string;
  submission: string;
  comments: string;
}

@Component({
  selector: 'app-question',
  imports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatSelectModule, MatInputModule,
  FormsModule,
],
  templateUrl: './answer.component.html',
  styleUrl: '../shared/form.component.css'
})
export class AnswerComponent {
  // Required to send http requests
  private http = inject(HttpClient)
  
  // Some stuff needed to enable the character count
  protected readonly textLength = signal('');
  protected readonly commentLength = signal('');

  // [boolean] Trigger expand additional comments
  additional_comments:boolean = false
  // [boolean] Show a certain error text string beneath the button when submit-form fails
  form_error = false 
  // [boolean] Show the text field and submit button once fetched
  pressed_fetch = false

  formData = {
    email : '',
    submission : '',
    language : 'english',
    comments : '',
    status: '' // be it fetching or submitting
  }

  // ([get] request) interface

  enable_additional_comments() 
  {
    this.additional_comments = !this.additional_comments
  }

  enable_fetched_data() 
  {
    this.pressed_fetch = true // !!!!! REMEMBER TO FIX THIS so that it only changes the value to true - once pressed it stays that way
  }

  // Submit the texts and its data to node server
  submitForm(form: NgForm)
  {
    if (!form.valid) return;

    this.http.get<FetchResponse>(`http://127.0.0.1:3000/fetch?language=${encodeURIComponent(this.formData.language)}`).subscribe({
      next: (response) => {
        this.formData.submission = response.submission;
        this.formData.comments = response.comments;
        },
      error: (error) => {
        console.error('Error: Fetch fails', error);
        this.formData.submission = error.error;
      }
    }); 
  }




  protected onInputText(event: Event) {
    this.textLength.set((event.target as HTMLInputElement).value);
  }
  protected onInputComment(event: Event) {
    this.commentLength.set((event.target as HTMLInputElement).value);
  }
}
