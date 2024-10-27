import type { DropdownDividerClass, DropdownDividerTheme } from './dropdown-divider.theme';
import { DropdownDividerThemeService } from './dropdown-divider.theme.service';
import { DropdownComponent } from './dropdown.component';

import { BaseComponent } from 'flowbite-angular';

import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  standalone: true,
  imports: [NgClass],
  selector: 'flowbite-dropdown-divider',
  template: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownDividerComponent extends BaseComponent<DropdownDividerClass> {
  public readonly themeService = inject(DropdownDividerThemeService);
  public readonly dropdownComponent = inject(DropdownComponent);

  //#region properties
  public customStyle = model<Partial<DropdownDividerTheme>>({});
  //#endregion

  //#region BaseComponent implementation
  public override fetchClass(): DropdownDividerClass {
    return this.themeService.getClasses({
      customStyle: this.customStyle(),
    });
  }
  //#endregion
}
