import { Directive, EventEmitter, Input, OnChanges, Output } from '@angular/core';


@Directive({
  host: {
    '(change)': 'triggerOnChange($event)',
    '[checked]': 'isChecked',
  },
  selector: '[checklist]',
})
export class ChecklistDirective implements OnChanges {
  @Input() checklist: any[];
  @Input() checklistValue: any;
  @Output() checklistChange = new EventEmitter<any[]>();
  isChecked: boolean;

  ////////////
  contains(obj: object) {
    const exist = this.checklist.some(val => JSON.stringify(obj) === JSON.stringify(val));
    return exist;
  }

  ngOnChanges() {
    if (typeof this.checklistValue === "object") {
      this.isChecked = this.contains(this.checklistValue);
    } else {
      this.isChecked = this.checklist.indexOf(this.checklistValue) >= 0;
    }
  }

  triggerOnChange($event: Event) {
    const target = $event.target as HTMLInputElement;
    let updatedList;
    this.isChecked = target && target.checked ? true : false;

    if (this.isChecked) {
      updatedList = [...this.checklist, this.checklistValue];
    }
    else {
      const i = this.checklist.indexOf(this.checklistValue);
      updatedList = [...this.checklist.slice(0, i), ...this.checklist.slice(i + 1)];
    }

    this.checklistChange.emit(updatedList);
  }
}
