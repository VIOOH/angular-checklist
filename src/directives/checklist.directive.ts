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
      if (typeof this.checklistValue === "object") {
        this.checklist.push(this.checklistValue);
        updatedList = this.checklist;
      } else {
        updatedList = [...this.checklist, this.checklistValue];
      }
    } else {
      if (typeof this.checklistValue === "object") {
        const i = this.checklist.findIndex(x => x.id == this.checklistValue.id);
        this.checklist.splice(i, 1);
        updatedList = this.checklist;
      } else {
        const j = this.checklist.indexOf(this.checklistValue);
        updatedList = [...this.checklist.slice(0, j), ...this.checklist.slice(j + 1)];
      }
    }
    this.checklistChange.emit(updatedList);
  }
}
