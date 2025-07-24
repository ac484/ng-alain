import { Component } from '@angular/core';
import { HubFireCrudComponent } from '../fire-crud/hub-crud.component';

@Component({
  selector: 'hub-contract',
  standalone: true,
  imports: [HubFireCrudComponent],
  template: `<hub-fire-crud></hub-fire-crud>`
})
export class HubContractComponent {}
