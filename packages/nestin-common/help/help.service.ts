import { Injectable } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import moment = require('moment');

@Injectable()
export class HelpService {
  constructor(readonly configService: ConfigService) {}

  storageUrl(filename: string) {
    return `${this.configService.get('app.baseUrl')}/upload/${filename}`;
  }

  avatarUrl(filename: string) {
    return `${this.configService.get('app.baseUrl')}/upload/avatar/${filename}.JPG`;
  }

  templateUrl(filename: string) {
    return `${this.configService.get('app.baseUrl')}/template/${filename}`;
  }

  getWorkType(d: Date) {
    const h = d.getHours();
    const m = d.getMinutes();
    if (h > this.configService.get('app.dayWorkHour') && h < this.configService.get('app.nightWorkHour')) {
      return 'day';
    } else if (h === this.configService.get('app.dayWorkHour') && m >= this.configService.get('app.dayWorkMin')) {
      return 'day';
    } else if (h === this.configService.get('app.nightWorkHour') && m < this.configService.get('app.nightWorkMin')) {
      return 'day';
    } else {
      return 'night';
    }
  }

  getWorkInfo(d: Date): { workDate: Date; workType: string } {
    const workType = this.getWorkType(d);
    if (workType === 'day') {
      return {
        workDate: moment(d)
          .startOf('d')
          .toDate(),
        workType,
      };
    } else {
      const h = d.getHours();
      if (h >= this.configService.get('app.nightWorkHour')) {
        return {
          workDate: moment(d)
            .startOf('d')
            .toDate(),
          workType,
        };
      } else {
        return {
          workDate: moment(d)
            .startOf('d')
            .subtract(1, 'd')
            .toDate(),
          workType,
        };
      }
    }
  }
}
