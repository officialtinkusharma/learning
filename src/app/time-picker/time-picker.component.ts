import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
})
export class TimePickerComponent implements OnInit {
  constructor() {}
  hh: any = '';
  mm: any = '';
  ss: any = '';
  timeset = 'PM';
  millisecond: any;

  ngOnInit(): void {
    this.getTimeMethod();
    let milisecond = new Date().getMilliseconds();
    if (milisecond < 100) {
      let timer = 100 - milisecond;
      setTimeout(() => {
        setInterval(this.getTimeMethod, 1000);
      }, timer);
    } else {
      setInterval(() => {
        this.getTimeMethod();
      }, 1000);
    }
  }
  getTimeMethod() {
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();
    if (hour > 12) {
      let newhour = hour - 12;
      console.log(newhour);
      this.hh = newhour < 10 ? `0${newhour}` : `${newhour}`;
      this.timeset = 'PM';
    } else {
      this.timeset = 'AM';
      this.hh = hour < 10 ? `0${hour}` : `${hour}`;
    }
    this.mm = minutes < 10 ? `0${minutes}` : `${minutes}`;
    this.ss = second < 10 ? `0${second}` : `${second}`;
  }
}
