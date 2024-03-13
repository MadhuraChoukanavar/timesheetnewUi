import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css'
})
export class SidemenuComponent {
  @Input() menuOptions: any[] = [];
  activeMenu: string = '';

  toggleSubmenu(mainOption: string): void {
    this.activeMenu = this.activeMenu === mainOption ? '' : mainOption;
  }

  isActive(mainOption: string): boolean {
    return this.activeMenu === mainOption;
  }
}
