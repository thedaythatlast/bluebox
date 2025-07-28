import {AnswerComponent} from './answer/answer.component';
import {QuestionComponent} from './question/question.component';

import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: 'answer', component: AnswerComponent },	
 	{ path: 'question', component: QuestionComponent },
];
