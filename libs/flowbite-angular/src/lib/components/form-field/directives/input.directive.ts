import type { DeepPartial } from '../../../common';
import { booleanToFlowbiteBoolean } from '../../../utils/boolean.util';
import { BaseInputDirective } from './base-input.directive';
import * as properties from './input.directive.theme';
import { InputDirectiveThemeService } from './input.directive.theme.service';

import { Directive, HostBinding, inject, input, signal } from '@angular/core';

@Directive({
  standalone: true,
  selector: 'input[flowbiteInput]',
})
export class InputDirective extends BaseInputDirective {
  @HostBinding('attr.disabled') get getIsDisabled() {
    return this.formFieldComponent.isDisabled() || null;
  }

  protected override contentClasses = signal<properties.InputDirectiveClass>(properties.inputDirectiveClassInstance);

  protected readonly themeService = inject(InputDirectiveThemeService);

  //#region properties
  public customStyle = input<DeepPartial<properties.InputDirectiveBaseTheme>>({});
  //#endregion

  //#region BaseInputDirective implementation
  override fetchClass(): void {
    const propertyClass = this.themeService.getClasses({
      disabled: booleanToFlowbiteBoolean(this.formFieldComponent.isDisabled()),
      size: this.formFieldComponent.size(),
      validate: this.formFieldComponent.validate(),
      prefix: this.formFieldComponent.prefix(),
      floatingLabelType: this.formFieldComponent.floatingLabelType(),
      customStyle: this.customStyle(),
    });

    this.contentClasses.set(propertyClass);
  }
  //#endregion
}
