import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../enrollment.service';

@Component({
  selector: 'app-compileandrun',
  templateUrl: './compileandrun.component.html',
  styleUrls: ['./compileandrun.component.css']
})
export class CompileandrunComponent implements OnInit {

  constructor(private _enrollment: EnrollmentService) { }
  code: string;
  languages = ['C','CPP','JAVA','PYTHON'];
  lang: string;
  result: any;
  bootstrapclass: string = 'info';

  ngOnInit() {
  }

  submit() {
    if(this.lang == 'C')
        this.lang = 'c';
    if(this.lang == 'CPP')
        this.lang = 'cpp';
    if(this.lang == 'JAVA')
        this.lang = 'java';
    if(this.lang == 'PYTHON')
        this.lang = 'PY';
    this._enrollment.evaluate({c: this.code, l: 'cpp'}).subscribe(
      data => { console.log('Success', data);
      this.result = data;
      this.assignClass();
       },
      error => console.log('Error', error),
    );
  }

  assignClass() {
    if(this.result.code == 1) {
      this.bootstrapclass = 'success';
      this.result = 'Correct Answer';
    }
    if(this.result.code == 0) {
      this.bootstrapclass = 'danger';
      this.result = 'Wrong Answer';
    }
    if(this.result.code == 2) {
      this.bootstrapclass = 'warning';
      let errorString = this.result.res.stderr.replace(/C:\\Users\\user\\Desktop\\submitfile/gi,'solution');
      this.result = 'Compile Time Error:\r\n'+errorString;
    }
    if(this.result.code == 3) {
      this.bootstrapclass = 'danger';
      this.result = 'Run Time Error';
    }
    if(this.result.code == 4) {
      this.bootstrapclass = 'warning';
      this.result = 'Time Limit Exceeded';
    }
  }
}
