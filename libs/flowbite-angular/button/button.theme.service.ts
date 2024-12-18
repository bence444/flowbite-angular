import type { ButtonClass, ButtonProperties, ButtonTheme } from './button.theme';

import type { FlowbiteThemeService } from 'flowbite-angular';
import { mergeTheme } from 'flowbite-angular/utils';

import { inject, Injectable, InjectionToken } from '@angular/core';
import { twMerge } from 'tailwind-merge';

/**
 * `InjectionToken` used to import `ButtonTheme` value
 *
 * @example
 * ```
 * var theme = inject(FLOWBITE_BUTTON_THEME_TOKEN)
 * ```
 */
export const FLOWBITE_BUTTON_THEME_TOKEN = new InjectionToken<ButtonTheme>(
  'FLOWBITE_BUTTON_THEME_TOKEN'
);

@Injectable({
  providedIn: 'root',
})
export class ButtonThemeService implements FlowbiteThemeService<ButtonProperties> {
  private readonly baseTheme = inject(FLOWBITE_BUTTON_THEME_TOKEN);

  public getClasses(properties: ButtonProperties): ButtonClass {
    const theme: ButtonTheme = mergeTheme(this.baseTheme, properties.customStyle);

    const output: ButtonClass = {
      rootClass: twMerge(
        properties.gradientDuoTone && properties.fill == 'outline'
          ? theme.root.base['span']
          : `${theme.root.base['default']} ${theme.root.size[properties.size]}`,
        properties.gradientDuoTone
          ? theme.root.gradientDuoTone[properties.gradientDuoTone][properties.fill]
          : properties.gradientMonochrome
            ? theme.root.gradientMonochrome[properties.gradientMonochrome]
            : theme.root.color[properties.color][properties.fill],
        theme.root.isPill[properties.isPill],
        theme.root.isDisabled[properties.isDisabled]
      ),
      spanClass: twMerge(
        theme.span.base,
        theme.span.isPill[properties.isPill],
        theme.span.size[properties.size]
      ),
    };

    return output;
  }
}
