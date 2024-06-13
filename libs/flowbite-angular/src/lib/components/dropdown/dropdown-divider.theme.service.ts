import {
  DropdownDividerBaseTheme,
  DropdownDividerClass,
  DropdownDividerProperties,
} from './dropdown-divider.theme';
import { FlowbiteThemeService } from '../../common';
import { mergeTheme } from '../../utils/merge-theme';

import { InjectionToken, inject } from '@angular/core';
import { twMerge } from 'tailwind-merge';

export const FLOWBITE_DROPDOWN_DIVIDER_THEME_TOKEN =
  new InjectionToken<DropdownDividerBaseTheme>(
    'FLOWBITE_DROPDOWN_DIVIDER_THEME_TOKEN',
  );

export class DropdownDividerThemeService
  implements FlowbiteThemeService<DropdownDividerProperties>
{
  private baseTheme = inject(FLOWBITE_DROPDOWN_DIVIDER_THEME_TOKEN);

  public getClasses(
    properties: DropdownDividerProperties,
  ): DropdownDividerClass {
    const theme: DropdownDividerBaseTheme = mergeTheme(
      this.baseTheme,
      properties.customStyle,
    );

    const output: DropdownDividerClass = {
      rootClass: twMerge(theme.root.base),
    };

    return output;
  }
}