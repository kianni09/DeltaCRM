import { NativeDateAdapter } from "@angular/material/core";
import * as moment from 'moment';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: Object): string {
        moment.locale('uk');
        var formatString = 'DD.MM.YYYY';
        return moment(date).format(formatString);
    }

    getFirstDayOfWeek(): number {
        return 1;
       }
}
