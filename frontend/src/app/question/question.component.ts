import { Component, inject, signal } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

import { FormsModule, NgForm } from '@angular/forms'
 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-question',
  imports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatSelectModule, MatInputModule,
  FormsModule,
],
  templateUrl: './question.component.html',
  styleUrl: '../shared/form.component.css'
})

export class QuestionComponent {
  // Required to send http requests
  private http = inject(HttpClient)
  
  // Some stuff needed to enable the character count
  protected readonly textLength = signal('');

  // [boolean] Trigger error text when submit-form fails
  form_error = false

  // [boolean] Data is being sent when the submit button is pressed
  isProcessing_SubmitButton = false

  // Data form of the submission by default
  formData = {
    email : '',
    submission : '',
    language : 'english',
    comments : ''
  }


  // Submit the texts and its data to node server
  submitForm(form: NgForm)
  {
    // if the form isn't valid, exit function
    if (!form.valid) return;
    // if the button is process, exit function
    if (this.isProcessing_SubmitButton) return;

    // trigger switch on that the button is processing
    this.isProcessing_SubmitButton = true;

    

    // send http request
    this.http.post('http://127.0.0.1:3000/submit-form', this.formData).subscribe({
      next: (response) => {
        this.form_error = false;
        console.log(response);
        },
      error: (error) => {
        this.form_error = true;
        console.error('Error: Submission fails', error);
      }
    }); 

    // 2 code lines to reset the form
    this.formData.submission = '';
    // trigger switch off that the button is no longer processing
    this.isProcessing_SubmitButton = false;
  }

  // Character count for each Text, and Comment field
  protected onInputText(event: Event) {
    this.textLength.set((event.target as HTMLInputElement).value);
  }
}
