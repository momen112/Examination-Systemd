import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from 'src/services/Exams.service';
import { QuestionService } from 'src/services/Question.Service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-exam-qas',
  templateUrl: './exam-qas.component.html',
  styleUrls: ['./exam-qas.component.css']
})
export class ExamQAsComponent implements OnInit {
  exam: any;
  examId: any;
  Questions: any;

  Choices: any[] = [];
  currentQuestionIndex = 0;
  currentQuestion:any;
  selectedAnswer:any[] = [];
  score :any[] = [];
  progressValue: any;
  isSubmittedVisible = false;
  rightAnswers=0
  wrongAnswers=0
  totalScore=0
  userExamRelation:any
  attampedQuesstions=0;
UnattampedQuesstions=0;
questionScore=15;
totalexamscore:any
totalQquestionNumber=0

  constructor(
    private examservices: ExamService,
    private questionService:QuestionService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.examId = this.activatedRoute.snapshot.paramMap.get('examId');

    this.examservices.getExamById(this.examId).subscribe({
      next: (response: any) => {
        this.exam = response; 
      },
      error: (error) => {
        console.log(error);
      }
      
    });

    this.questionService.getQuestions(this.examId).subscribe({
      next: (response: any) => {
        this.Questions = response;
        this.totalQquestionNumber=this.Questions.length;
        
      this.getChoices();    
        this.score=[this.Questions.length];     
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getNextQuestion() {
    
    if (this.currentQuestionIndex < this.Questions.length-1) {
      this.scoreCaluclation()
      this.currentQuestionIndex++;
      this.getChoices();

    } else {

      this.scoreCaluclation()
      this.isSubmittedVisible=true;
    }
  }
  getPreviousQuestion(){

    console.log(this.currentQuestionIndex);
    if (this.currentQuestionIndex>0) {
      this.currentQuestionIndex--;
      this.scoreCaluclation()

      this.getChoices();
    } 
  }

  scoreCaluclation() {
 
    if(this.selectedAnswer[this.currentQuestionIndex] ==this.currentQuestion.rightAnswer)
    {
      this.score[this.currentQuestionIndex]=(1*this.questionScore);
      //this.rightAnswers++
      //this.attampedQuesstions++
    }else if(this.selectedAnswer[this.currentQuestionIndex]==null){
    // this.UnattampedQuesstions++;
    this.score[this.currentQuestionIndex]=null;

    }
    else{
      this.score[this.currentQuestionIndex]=0;
      // this.wrongAnswers++
      // this.attampedQuesstions++

    }
   this.totalScore=this.score.reduce((total,current)=>total+current,0)
   console.log("total score"+ this.totalScore);
   
  }

  getChoices(){
    this.currentQuestion = this.Questions[this.currentQuestionIndex];
    this.Choices = [
    this.currentQuestion.questionFirstChoice,
    this.currentQuestion.questionSecondChoice,
    this.currentQuestion.questionThirdChoice,
    this.currentQuestion.questionFourthChoice
  ];
  this.selectedAnswer.length=this.Choices.length;
  this.totalexamscore=this.Questions.length*this.questionScore;
        console.log( this.totalexamscore,);
  
  }

  onProgress(){
    if (this.currentQuestionIndex< this.Questions.length+1) {
      this.progressValue = ((this.currentQuestionIndex+1) / this.Questions.length) * 100; 
       }
      else{this.progressValue = 0;}
      return this.progressValue;
  }
  onSubmit(){
    
    for(var i=0;this.score.length>i;i++){
        if(this.score[i] > 0) {
          this.rightAnswers++;
          console.log( this.rightAnswers,this.wrongAnswers,this.UnattampedQuesstions,this.attampedQuesstions);
          this.attampedQuesstions++;

        }
        else if(this.score[i] == null){
            this.UnattampedQuesstions++;
        }else{
          this.wrongAnswers++;
          this.attampedQuesstions++;
        }
    }
   this.router.navigate(['/score',this.examId,this.totalScore,this.attampedQuesstions,this.UnattampedQuesstions,this.wrongAnswers,this.rightAnswers,this.totalexamscore,this.totalQquestionNumber]);

  }

}
