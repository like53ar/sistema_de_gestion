import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        // Add reusable UI components, directives, and pipes here
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
        // Export components to make them available to feature modules
    ]
})
export class SharedModule { }
