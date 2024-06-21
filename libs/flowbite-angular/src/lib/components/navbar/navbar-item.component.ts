import * as properties from './navbar-item.theme';

import { BaseComponent } from '../base.component';
import { FlowbiteLink } from '../../common/flowbite.type';
import { LinkRouter, NavbarState, SignalStoreService } from '../../services';
import { NavbarItemThemeService } from './navbar-item.theme.service';

import { Component, HostListener, inject, input, signal } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'flowbite-navbar-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './navbar-item.component.html',
})
export class NavbarItemComponent extends BaseComponent {
  protected readonly themeService = inject(NavbarItemThemeService);
  protected readonly navbarService = inject<SignalStoreService<NavbarState>>(
    SignalStoreService<NavbarState>,
  );
  protected readonly linkRouter = inject(LinkRouter);

  protected override contentClasses = signal<properties.NavbarItemClass>(
    properties.NavbarItemClassInstance,
  );

  //#region properties
  public color = input<keyof properties.NavbarItemColors>('blue');
  public customStyle = input<Partial<properties.NavbarItemBaseTheme>>({});
  public link = input<FlowbiteLink | undefined>(undefined);
  //#endregion

  //#region BaseComponent implementation
  protected override fetchClass(): void {
    const propertyClass = this.themeService.getClasses({
      color: this.color(),
      customStyle: this.customStyle(),
    });

    this.contentClasses.set(propertyClass);
  }
  //#endregion

  @HostListener('click')
  protected onClick(): void {
    this.navbarService.set('isCollapsed', false);

    this.linkRouter.navigate(this.link());
  }
}
