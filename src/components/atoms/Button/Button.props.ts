import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { IconName } from '../ButtonIcon/ButtonIcon.props';

export interface ButtonProps extends
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	children: ReactNode;
	appearance: 'primary' | 'ghost' | 'disabled';
	icon?: IconName;
}