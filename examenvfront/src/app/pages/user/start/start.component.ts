import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  
  qId:any;
  questions:any;

  marksGained=0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;

  timer:any;

  constructor(private locationSt: LocationStrategy, private _router: ActivatedRoute, private _question: QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qId = this._router.snapshot.params["qid"];
    this.loadQuestions();
  }

  loadQuestions() {
   this._question.getQuestionsOfQuizForTest(this.qId).subscribe(
    (data:any)=>{
     this.questions = data;
     this.timer = this.questions.length * 2 * 60;
     this.questions.forEach(
      (q:any)=>{
          q['givenAnswer'] = '';
      },
     );
     console.log(this.questions);
     this.startTimer();
    },
    (error)=>{
      Swal.fire("Error","Error in loading questions of quiz","error");
    }
   );
  }

  preventBackButton(){
    history.pushState(null,'',location.href);
    this.locationSt.onPopState(
      ()=>{
        history.pushState(null,'',location.href);
      }
    );
  }

  submitQuiz(){
    Swal.fire(
      {
        title: 'Do you want to submit the quiz?',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        icon: 'info'
      }
    ).then(
      (result)=>{
        if(result.isConfirmed){
          this.evalQuiz();
        }
      }
    );
  }

  startTimer(){
    let t = window.setInterval(()=>{
      if(this.timer <= 0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000);
  }

  getFormattedTime(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz(){
    this._question.evaluateQuiz(this.questions).subscribe(
      (data:any)=>{
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.marksGained = data.marksGained;
        this.isSubmit = true;
      },
      (error)=>{
        console.log(error);
      }
    );
    /*
    this.isSubmit = true;
    this.questions.forEach(
      (q:any)=>{

        if(q.givenAnswer == q.answer){
          this.correctAnswers++;
         let markSingle = this.questions[0].quiz.maxMark / this.questions.length;
         this.marksGained += markSingle;
        }
        if(q.givenAnswer.trim()!=''){
          this.attempted++;
        }
      }
    );
    */

  }

  printPage(){
    window.print();
  }


}
