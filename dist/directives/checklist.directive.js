"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ChecklistDirective = (function () {
    function ChecklistDirective() {
        this.checklistChange = new core_1.EventEmitter();
    }
    ////////////
    ChecklistDirective.prototype.contains = function (obj) {
        var exist = this.checklist.some(function (val) { return JSON.stringify(obj) === JSON.stringify(val); });
        return exist;
    };
    ChecklistDirective.prototype.ngOnChanges = function () {
        if (typeof this.checklistValue === "object") {
            this.isChecked = this.contains(this.checklistValue);
        }
        else {
            this.isChecked = this.checklist.indexOf(this.checklistValue) >= 0;
        }
    };
    ChecklistDirective.prototype.triggerOnChange = function ($event) {
        var _this = this;
        var target = $event.target;
        var updatedList;
        this.isChecked = target && target.checked ? true : false;
        if (this.isChecked) {
            if (typeof this.checklistValue === "object") {
                this.checklist.push(this.checklistValue);
                updatedList = this.checklist;
            }
            else {
                updatedList = this.checklist.concat([this.checklistValue]);
            }
        }
        else {
            if (typeof this.checklistValue === "object") {
                var i = this.checklist.findIndex(function (x) { return x.id == _this.checklistValue.id; });
                this.checklist.splice(i, 1);
                updatedList = this.checklist;
            }
            else {
                var j = this.checklist.indexOf(this.checklistValue);
                updatedList = this.checklist.slice(0, j).concat(this.checklist.slice(j + 1));
            }
        }
        this.checklistChange.emit(updatedList);
    };
    return ChecklistDirective;
}());
ChecklistDirective.decorators = [
    { type: core_1.Directive, args: [{
                host: {
                    '(change)': 'triggerOnChange($event)',
                    '[checked]': 'isChecked',
                },
                selector: '[checklist]',
            },] },
];
/** @nocollapse */
ChecklistDirective.ctorParameters = function () { return []; };
ChecklistDirective.propDecorators = {
    'checklist': [{ type: core_1.Input },],
    'checklistValue': [{ type: core_1.Input },],
    'checklistChange': [{ type: core_1.Output },],
};
exports.ChecklistDirective = ChecklistDirective;
//# sourceMappingURL=checklist.directive.js.map