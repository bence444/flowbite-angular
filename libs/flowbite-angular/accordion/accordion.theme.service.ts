import type { AccordionClass, AccordionProperties, AccordionTheme } from './accordion.theme';

import type { FlowbiteThemeService } from 'flowbite-angular';
import { mergeTheme } from 'flowbite-angular/utils';

import { inject, Injectable, InjectionToken } from '@angular/core';
import { twMerge } from 'tailwind-merge';

/**
 * `InjectionToken` used to import `AccordionTheme` value
 *
 * @example
 * ```
 * var theme = inject(FLOWBITE_ACCORDION_THEME_TOKEN)
 * ```
 */
export const FLOWBITE_ACCORDION_THEME_TOKEN = new InjectionToken<AccordionTheme>(
  'FLOWBITE_ACCORDION_THEME_TOKEN'
);

@Injectable({
  providedIn: 'root',
})
export class AccordionThemeService implements FlowbiteThemeService<AccordionProperties> {
  private readonly baseTheme = inject(FLOWBITE_ACCORDION_THEME_TOKEN);

  public getClasses(properties: AccordionProperties): AccordionClass {
    const theme: AccordionTheme = mergeTheme(this.baseTheme, properties.customStyle);

    const output: AccordionClass = {
      rootClass: twMerge(theme.root.base),
    };

    return output;
  }
}
