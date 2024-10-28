import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  URL = 'https://api.openweathermap.org/data/2.5/weather';

  apiKey = '1d0828d6368e7043a68c4bab195a8753';
  weather: any;
  temp: number = 0;
  minTemp = 0;
  maxTemp = 0;
  feel_like = 0;
  sunrise: any;
  sunset: any;
  city: string = 'Tamilnadu';


  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getweather();
    setInterval(()=>{
      this.getweather()
    },1000)
  }


  getweather() {
    
    this.http
      .get(`${this.URL}?q=${this.city}&appid=${this.apiKey}&units=imperial"`)

      .subscribe({
        next: (data) => {
          this.weather = data;
        
          let date = new Date(this.weather.sys.sunrise * 1000);
          this.sunrise = date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          let date1 = new Date(this.weather.sys.sunset * 1000);
          this.sunset = date1.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          
          this.temp = Math.ceil(this.weather.main.temp - 273.15);
          this.minTemp = Math.ceil(this.weather.main.temp_min - 273.15);
          this.maxTemp = Math.ceil(this.weather.main.temp_max - 273.15);
          this.feel_like = Math.ceil(this.weather.main.feels_like - 273.15);
        },
        error: (error) => {
          console.error('Error', error);
        },
      });
  }
}
