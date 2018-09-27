import { FormControl } from '@angular/forms';

export function AmountValidator(control: FormControl): { [s: string]: boolean } {
    if (control && control.value <= 0) {
        return {
            'invalidAmount': true
        };
    }
    return null;
}
