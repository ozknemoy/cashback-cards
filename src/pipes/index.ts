
import { NgModule } from '@angular/core';

import {TrimPipe} from './trim.pipe';
import {ThousandPipe} from './1000.pipe'
import {FilterPipe} from './filter.pipe'
import {SanitizePipe} from './sanitize.pipe'
import {RangePipe} from "./range.pipe";


export const pipes = [
    TrimPipe,ThousandPipe,FilterPipe,SanitizePipe, RangePipe
];

@NgModule({
    declarations:[pipes],
    exports:[pipes]
})
export class PipeModule{}