import { BsGithub } from 'react-icons/bs';
import cn from 'clsx';
import { format } from 'date-fns';

import styles from './Footer.module.scss';
import { FooterProps } from './Footer.props';

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
  return (
    <footer
      className={cn(
        className,
        styles.footer,
        'bg-light border-top py-4 mt-auto',
      )}
      {...props}>
      <p>Code knowledge test © 2021 - {format(new Date(), 'yyyy')}</p>
      <a
        href="https://github.com/kramax42/test-code-knowledge-client"
        target="_blank"
        rel="noreferrer">
        <BsGithub />
        {` Github`}
      </a>
    </footer>
  );
};
