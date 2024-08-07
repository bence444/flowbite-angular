import type { FlowbiteBoolean, FlowbiteClass, FlowbiteColors } from '../../common/flowbite.theme';
import type { DeepPartial } from '../../common/flowbite.type';
import { createTheme } from '../../utils/theme/create-theme';

//#region Component theme option
export type AlertColors = Pick<FlowbiteColors, 'info' | 'failure' | 'success' | 'warning' | 'dark'>;
//#endregion

export interface AlertProperties {
  color: keyof AlertColors;
  hasBorder: keyof FlowbiteBoolean;
  hasBorderAccent: keyof FlowbiteBoolean;
  customStyle: DeepPartial<AlertBaseTheme>;
}

export interface AlertBaseTheme {
  base: string;
  color: AlertColors;
  hasBorder: FlowbiteBoolean;
  hasBorderAccent: FlowbiteBoolean;
  closeButton: AlertButtonTheme;
}

export interface AlertButtonTheme {
  base: string;
  color: AlertColors;
}

export const alertTheme: AlertBaseTheme = createTheme({
  base: 'flex flex-col gap-2 p-4 text-sm rounded-lg',
  color: {
    info: 'text-blue-800 dark:text-blue-400 bg-blue-50 dark:bg-gray-800 border-blue-300 dark:border-blue-800',
    failure: 'text-red-800 dark:text-red-400 bg-red-100 dark:bg-gray-800 border-red-300 dark:border-red-800',
    success: 'text-green-800 dark:text-green-400 bg-green-100 dark:bg-gray-800 border-green-300 dark:border-green-800',
    warning:
      'text-yellow-800 dark:text-yellow-300 bg-yellow-100 dark:bg-gray-800 border-yellow-300 dark:border-yellow-800',
    dark: 'text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600',
  },
  hasBorder: {
    enabled: 'border',
    disabled: 'border-0',
  },
  hasBorderAccent: {
    enabled: 'border-t-4',
    disabled: '',
  },
  closeButton: {
    base: '-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg p-1.5 focus:ring-2',
    color: {
      info: 'text-blue-500 dark:text-blue-600 hover:bg-blue-200 dark:hover:bg-blue-300',
      failure: 'text-red-500 dark:text-red-600 hover:bg-red-200 dark:hover:bg-red-300',
      success: 'text-green-500 dark:text-green-600 hover:bg-green-200 dark:hover:bg-green-300',
      warning: 'text-yellow-500 dark:text-yellow-600 hover:bg-yellow-200 dark:hover:bg-yellow-300',
      dark: 'text-gray-500 dark:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-300',
    },
  },
});

export interface AlertClass extends FlowbiteClass {
  closeButtonClass: string;
}

export const AlertClassInstance: AlertClass = {
  closeButtonClass: '',
  rootClass: '',
};
