/**
 * NG-ALAIN OpenWeatherMap 天氣元件
 *
 * 功能：顯示當前天氣資訊
 * 位置：Header 工具列
 * API：OpenWeatherMap (75d07b2345362f4603a113aee9c6747c)
 */

import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { catchError, of } from 'rxjs';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  name: string;
  sys: {
    country: string;
  };
}

@Component({
  selector: 'header-weather',
  template: `
    <div nz-dropdown [nzDropdownMenu]="weatherMenu" nzTrigger="click" (nzVisibleChange)="onVisibleChange()">
      <div class="alain-default__nav-item">
        @if (loading) {
          <nz-spin nzSize="small"></nz-spin>
        } @else {
          <i nz-icon [nzType]="getWeatherIcon()" class="alain-default__nav-item-icon"></i>
          <span>{{ getTemperature() }}</span>
        }
      </div>
    </div>

    <nz-dropdown-menu #weatherMenu="nzDropdownMenu">
      <div nz-menu class="wd-lg">
        @if (weatherData) {
          <div class="p-md">
            <div class="text-center mb-md">
              <h4 class="mb-sm">{{ weatherData.name }}, {{ weatherData.sys.country }}</h4>
              <div class="text-lg">{{ Math.round(weatherData.main.temp) }}°C</div>
              <div class="text-grey">{{ weatherData.weather[0].description }}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div>
                <i nz-icon nzType="thermometer"></i>
                <span>體感溫度: {{ Math.round(weatherData.main.feels_like) }}°C</span>
              </div>
              <div>
                <i nz-icon nzType="cloud"></i>
                <span>濕度: {{ weatherData.main.humidity }}%</span>
              </div>
            </div>
          </div>
        } @else {
          <div class="p-md text-center">
            <i nz-icon nzType="cloud" class="text-grey"></i>
            <div class="text-grey">無法獲取天氣資訊</div>
          </div>
        }
      </div>
    </nz-dropdown-menu>
  `,
  styles: [
    `
      .alain-default__nav-item {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        padding: 0 12px;
        height: 100%;
      }

      .alain-default__nav-item-icon {
        font-size: 16px;
      }

      .wd-lg {
        width: 280px;
      }

      .text-lg {
        font-size: 24px;
        font-weight: bold;
      }

      .text-grey {
        color: #999;
      }

      .mb-sm {
        margin-bottom: 8px;
      }

      .mb-md {
        margin-bottom: 16px;
      }

      .p-md {
        padding: 16px;
      }

      .d-flex {
        display: flex;
      }

      .justify-content-between {
        justify-content: space-between;
      }

      .text-center {
        text-align: center;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzDropDownModule, NzIconModule, NzMenuModule, NzSpinModule]
})
export class HeaderWeatherComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly msg = inject(NzMessageService);

  weatherData: WeatherData | null = null;
  loading = false;
  Math = Math;

  ngOnInit(): void {
    this.loadWeather();
  }

  onVisibleChange(): void {
    if (!this.weatherData) {
      this.loadWeather();
    }
  }

  loadWeather(): void {
    this.loading = true;

    // 預設位置：台北市
    const lat = 25.033;
    const lon = 121.5654;
    const apiKey = '75d07b2345362f4603a113aee9c6747c';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=zh_tw`;

    this.http
      .get<WeatherData>(url)
      .pipe(
        catchError(error => {
          console.error('天氣 API 錯誤:', error);
          this.msg.error('無法獲取天氣資訊');
          return of(null);
        })
      )
      .subscribe(data => {
        this.weatherData = data;
        this.loading = false;
      });
  }

  getTemperature(): string {
    if (!this.weatherData) return '--°C';
    return `${Math.round(this.weatherData.main.temp)}°C`;
  }

  getWeatherIcon(): string {
    if (!this.weatherData) return 'cloud';

    const weatherMain = this.weatherData.weather[0].main.toLowerCase();
    const iconMap: Record<string, string> = {
      clear: 'sun',
      clouds: 'cloud',
      rain: 'cloud-rain',
      snow: 'cloud-snow',
      thunderstorm: 'thunderbolt',
      drizzle: 'cloud-drizzle',
      mist: 'cloud',
      smoke: 'cloud',
      haze: 'cloud',
      dust: 'cloud',
      fog: 'cloud',
      sand: 'cloud',
      ash: 'cloud',
      squall: 'cloud',
      tornado: 'thunderbolt'
    };

    return iconMap[weatherMain] || 'cloud';
  }
}
