import type { DeepPartial, FlowbiteClass, FlowbiteSizes } from 'flowbite-angular';
import { createTheme } from 'flowbite-angular/utils';

/**
 * Available navigation types for `PaginationButtonDirective`
 */
export interface PaginationNavigation {
  icon: string;
  text: string;
  both: string;
}

/**
 * Available sizes for `PaginationComponent`
 */
export interface PaginationSizes extends Pick<FlowbiteSizes, 'sm' | 'md'> {
  [key: string]: string;
}

/**
 * Required properties for class generation of `PaginationComponent`
 */
export interface PaginationProperties {
  size: keyof PaginationSizes;
  customStyle: DeepPartial<PaginationTheme>;
}

/**
 * Theme definition for `PaginationComponent`
 */
export interface PaginationTheme {
  root: {
    base: string;
    size: PaginationSizes;
  };
  icon: {
    size: PaginationSizes;
  };
}

/**
 * Default theme for `PaginationComponent`
 */
export const paginationTheme: PaginationTheme = createTheme({
  root: {
    base: 'group inline-flex -space-x-px border-gray-300 dark:border-gray-700',
    size: {
      sm: 'text-sm',
      md: 'text-base',
    },
  },
  icon: {
    size: {
      sm: 'w-5 h-5',
      md: 'w-6 h-6',
    },
  },
});

/**
 * Generated class definition for `PaginationComponent`
 */
export interface PaginationClass extends FlowbiteClass {
  iconClass: string;
}
