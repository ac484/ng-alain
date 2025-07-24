import { Component } from '@angular/core';
import { ContractListComponent } from './contract-list.component';

@Component({
  selector: 'hub-contract',
  standalone: true,
  imports: [ContractListComponent],
  template: `<contract-list></contract-list>`
})
export class HubContractComponent {}
