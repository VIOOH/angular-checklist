import { EventEmitter, OnChanges } from '@angular/core';
export declare class ChecklistDirective implements OnChanges {
    checklist: any[];
    checklistValue: any;
    checklistChange: EventEmitter<any[]>;
    isChecked: boolean;
    contains(obj: object): boolean;
    ngOnChanges(): void;
    triggerOnChange($event: Event): void;
}
