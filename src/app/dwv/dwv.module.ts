import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DwvComponent } from './dwv.component';
import { TagsDialogComponent } from './components/tags-dialog.component';
import { TagsTableComponent } from './components/tags-table.component';
import { AngularMaterialModule } from '../angular-material.module';
import { RequestService } from './services/request.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        DwvComponent,
        TagsDialogComponent,
        TagsTableComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatDialogModule,
        MatIconModule,
        MatProgressBarModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        AngularMaterialModule,
        HttpClientModule
    ],
    providers: [
        RequestService
    ],
    exports: [
        DwvComponent
    ]
})

export class DwvModule { }
