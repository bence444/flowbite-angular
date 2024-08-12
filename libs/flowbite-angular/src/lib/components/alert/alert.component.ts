import type { DeepPartial } from '../../common/flowbite.type';
import { booleanToFlowbiteBoolean } from '../../utils/boolean.util';
import { CLOSE_SVG_ICON } from '../../utils/icon.list';
import { BaseComponent } from '../base.component';
import { ButtonComponent } from '../button/button.component';
import { IconComponent, IconRegistry } from '../icon';
import * as properties from './alert.theme';
import { AlertThemeService } from './alert.theme.service';

import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import type { OnInit, TemplateRef } from '@angular/core';
import { booleanAttribute, Component, HostBinding, inject, input, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [NgIf, NgClass, NgTemplateOutlet, IconComponent, ButtonComponent],
  selector: 'flowbite-alert',
  template: `
    <div class="flex items-center">
      <ng-container [ngTemplateOutlet]="icon()"></ng-container>
      <div>
        <ng-content />
      </div>
      <button
        type="button"
        [ngClass]="contentClasses()!.closeButtonClass"
        *ngIf="isDismissable()"
        aria-label="Close"
        (click)="onDismissClick()">
        <span class="sr-only">Close</span>
        <flowbite-icon
          svgIcon="flowbite-angular:close"
          class="h-5 w-5" />
      </button>
    </div>
    <ng-container [ngTemplateOutlet]="additionalContent()"></ng-container>
  `,
})
export class AlertComponent extends BaseComponent implements OnInit {
  @HostBinding('attr.role') role = 'alert';

  protected readonly themeService = inject(AlertThemeService);
  protected readonly iconRegistry = inject(IconRegistry);
  protected readonly domSanitizer = inject(DomSanitizer);

  public override contentClasses = signal<properties.AlertClass>(properties.AlertClassInstance);

  //#region properties
  public color = input<keyof properties.AlertColors>('info');
  public hasBorder = input<boolean, string | boolean>(false, { transform: booleanAttribute });
  public hasBorderAccent = input<boolean, string | boolean>(false, { transform: booleanAttribute });
  public customStyle = input<DeepPartial<properties.AlertBaseTheme>>({});
  public icon = input<TemplateRef<unknown> | null>(null);
  public additionalContent = input<TemplateRef<unknown> | null>(null);
  public isDismissable = input<boolean, string | boolean>(false, { transform: booleanAttribute });
  public onDismiss = input<() => void | undefined>();
  //#endregion

  //#region BaseComponent implementation
  public override fetchClass(): void {
    const propertyClass = this.themeService.getClasses({
      color: this.color(),
      hasBorder: booleanToFlowbiteBoolean(this.hasBorder()),
      hasBorderAccent: booleanToFlowbiteBoolean(this.hasBorderAccent()),
      customStyle: this.customStyle(),
    });

    this.contentClasses.set(propertyClass);
  }
  //#endregion

  public override ngOnInit() {
    super.ngOnInit();

    this.iconRegistry.addRawSvgIconInNamepsace(
      'flowbite-angular',
      'close',
      this.domSanitizer.bypassSecurityTrustHtml(CLOSE_SVG_ICON),
    );
  }

  public onDismissClick() {
    const func = this.onDismiss();

    if (func) func();
  }
}
