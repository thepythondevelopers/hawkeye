import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  title = 'angular-chart';
  lineCanvasEle2: any;
  lineChar2: any;
  week: Array<String>=[];
  hindi: Array<String>=[];
  constructor() {
    Chart.register(...registerables);
    this.myfunction();
  }
  ngOnInit(): void {
    // Line Chart
    let lineCanvasEle: any = document.getElementById('line_chart')
    let lineChar = new Chart(lineCanvasEle.getContext('2d'), {
      type: 'line',
        data: {
          labels: this.hindi,
          datasets: [
            { data: [12, 15, 18, 14, 11, 19, 12], label: 'Orders', borderColor: 'rgba(54, 162, 235)' },
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Sales', borderColor: 'rgb(75, 192, 192)' },
          ],
        },
        options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
        }
      });
      // Line Chart2
    this.lineCanvasEle2= document.getElementById('line_chart2')
    this.lineChar2 = new Chart(this.lineCanvasEle2.getContext('2d'), {
      type: 'line',
        data: {
          labels: this.week,
          datasets: [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'week', borderColor: 'rgb(75, 192, 192)' }
          ],
        },
        options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
        }
      });
  }
  myfunction(){
    let a:Array<String>=[];
    let b:Array<String>=[];
    for(let i=0;i<7;i++){
      a[i]="raj";
      b[i]="harsh";
    }
    this.week=a;
    this.hindi=b;
  }
}
