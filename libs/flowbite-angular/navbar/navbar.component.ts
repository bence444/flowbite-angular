import { NavbarBrandComponent } from './navbar-brand.component';
import { NavbarContentComponent } from './navbar-content.component';
import { NavbarToggleComponent } from './navbar-toggle.component';
import type { NavbarClass, NavbarColors, NavbarTheme } from './navbar.theme';
import { NavbarThemeService } from './navbar.theme.service';

import type { DeepPartial } from 'flowbite-angular';
import { BaseComponent, booleanToFlowbiteBoolean } from 'flowbite-angular';

import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  inject,
  model,
  untracked,
  ViewEncapsulation,
} from '@angular/core';

/**
 * @see https://flowbite.com/docs/components/navbar/
 */
@Component({
  standalone: true,
  imports: [NgClass],
  selector: 'flowbite-navbar',
  template: `<ng-content />`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent extends BaseComponent<NavbarClass> {
  public readonly themeService = inject(NavbarThemeService);
  public readonly navbarBrandChild = contentChild(NavbarBrandComponent);
  public readonly navbarToggleChild = contentChild(NavbarToggleComponent);
  public readonly navbarContentChild = contentChild(NavbarContentComponent);

  //#region properties
  public color = model<keyof NavbarColors>('primary');
  public isOpen = model<boolean>(false);
  public isRounded = model<boolean>(false);
  public hasBorder = model<boolean>(false);
  public isFixed = model<boolean>(false);
  public customStyle = model<DeepPartial<NavbarTheme>>({});
  //#endregion

  //#region BaseComponent implementation
  public override fetchClass(): NavbarClass {
    return this.themeService.getClasses({
      hasBorder: booleanToFlowbiteBoolean(this.isRounded()),
      isRounded: booleanToFlowbiteBoolean(this.hasBorder()),
      isFixed: booleanToFlowbiteBoolean(this.isFixed()),
      customStyle: this.customStyle(),
    });
  }

  public override verify(): void {
    if (this.navbarContentChild() === undefined) {
      throw new Error('No NavbarContentComponent available');
    }
  }
  //#endregion

  public toggleVisibility(isOpen?: boolean): void {
    if (isOpen === undefined) {
      isOpen = untracked(() => !this.isOpen());
    }

    this.isOpen.set(isOpen);
  }
}
