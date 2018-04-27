import {NgModule} from '@angular/core';

import {TrimPipe} from './trim.pipe';
import {ThousandPipe} from './1000.pipe'
import {FilterPipe} from './filter.pipe'
import {SanitizePipe} from './sanitize.pipe'
import {RangePipe} from "./range.pipe";
import {FromDateToDatePipe} from "./from-date-to-date.pipe";
import {CardPipe} from "./card";
import {PhonePipe} from "./phone.pipe";


export const pipes = [
  TrimPipe, ThousandPipe, FilterPipe, SanitizePipe, RangePipe,
  FromDateToDatePipe, CardPipe, PhonePipe,
];

@NgModule({
  declarations: [pipes],
  exports: [pipes],
  providers: [pipes],
})
export class PipeModule {}