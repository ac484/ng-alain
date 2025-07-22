import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Functions, httpsCallable } from '@angular/fire/functions';

interface WeatherRequest {
  location: string;
  type?: 'current' | 'forecast';
}

interface WeatherResponse {
  status: 'SUCCESS' | 'ERROR';
  data?: any;
  error?: string;
}

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzIconModule, NzToolTipModule, NzSpinModule],
  template: `
    <div layout-default-header-item-trigger>
      <button
        nz-button
        nzType="text"
        nzSize="small"
        [nzLoading]="loading"
        (click)="refreshWeather()"
        nz-tooltip
        nzTooltipTitle="天氣資訊"
        nzTooltipPlacement="bottom"
      >
        <span nz-icon nzType="cloud" [nzTheme]="weatherIconTheme"></span>
        <span *ngIf="weatherData" class="weather-text">{{ weatherData.temperature }}°C</span>
      </button>
    </div>
  `,
  styles: [
    `
      .weather-text {
        margin-left: 4px;
        font-size: 12px;
      }
    `
  ]
})
export class WeatherComponent implements OnInit {
  private functions = inject(Functions);
  private message = inject(NzMessageService);

  loading = false;
  weatherData: any = null;
  weatherIconTheme: 'outline' | 'fill' = 'outline';

  ngOnInit(): void {
    this.loadWeather();
  }

  async loadWeather(): Promise<void> {
    if (this.loading) return;

    this.loading = true;
    try {
      const getWeatherData = httpsCallable<WeatherRequest, WeatherResponse>(this.functions, 'getWeatherData');
      const result = await getWeatherData({ location: '臺北市', type: 'current' });

      if (result.data.status === 'SUCCESS' && result.data.data) {
        this.weatherData = this.parseWeatherData(result.data.data);
        this.updateWeatherIcon();
      } else {
        throw new Error(result.data.error || '無法獲取天氣資訊');
      }
    } catch (error: any) {
      console.error('Weather loading error:', error);
      this.message.error('天氣資訊載入失敗');
    } finally {
      this.loading = false;
    }
  }

  async refreshWeather(): Promise<void> {
    await this.loadWeather();
  }

  private parseWeatherData(data: any): any {
    if (!data.records || !data.records.location || data.records.location.length === 0) {
      return null;
    }

    const location = data.records.location[0];
    const weatherElement = location.weatherElement?.find((el: any) => el.elementName === 'TEMP');

    return {
      temperature: weatherElement?.elementValue || 'N/A',
      location: location.locationName,
      description: location.weatherElement?.find((el: any) => el.elementName === 'Weather')?.elementValue || ''
    };
  }

  private updateWeatherIcon(): void {
    if (!this.weatherData) return;

    const temp = parseFloat(this.weatherData.temperature);
    if (!isNaN(temp)) {
      this.weatherIconTheme = temp > 25 ? 'fill' : 'outline';
    }
  }
}
