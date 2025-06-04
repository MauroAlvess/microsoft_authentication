import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-tenant',
  imports: [CommonModule, MatIconModule],
  templateUrl: './card-tenant.component.html',
  styleUrl: './card-tenant.component.css'
})
export class CardTenantComponent {

  @Input() items: any[] = [];
  @Input() title: string = '';
  @Input() icon: string = '';
}
