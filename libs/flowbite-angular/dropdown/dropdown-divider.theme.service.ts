import type {
  DropdownDividerClass,
  DropdownDividerProperties,
  DropdownDividerTheme,
} from './dropdown-divider.theme';

import type { FlowbiteThemeService } from 'flowbite-angular';
import { mergeTheme } from 'flowbite-angular/utils';

import { inject, InjectionToken } from '@angular/core';
import { twMerge } from 'tailwind-merge';

export const FLOWBITE_DROPDOWN_DIVIDER_THEME_TOKEN = new InjectionToken<DropdownDividerTheme>(
  'FLOWBITE_DROPDOWN_DIVIDER_THEME_TOKEN'
);

export class DropdownDividerThemeService
  implements FlowbiteThemeService<DropdownDividerProperties>
{
  private readonly baseTheme = inject(FLOWBITE_DROPDOWN_DIVIDER_THEME_TOKEN);

  public getClasses(properties: DropdownDividerProperties): DropdownDividerClass {
    const theme: DropdownDividerTheme = mergeTheme(this.baseTheme, properties.customStyle);

    const output: DropdownDividerClass = {
      rootClass: twMerge(theme.root.base),
    };

    return output;
  }
}
