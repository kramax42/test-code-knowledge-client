import { TagProps } from "./Tag.props";
import styles from "./Tag.module.scss";
import cn from "clsx";

const Tag = ({
  size = "md",
  children,
  color = "ghost",
  href,
  fullWidth = false,
  className,
  ...props
}: TagProps): JSX.Element => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.sm]: size == "sm",
        [styles.md]: size == "md",
        [styles.lg]: size == "lg",
        [styles.ghost]: color == "ghost",
        [styles.success]: color == "success",
        [styles.danger]: color == "error",
        [styles.info]: color == "info",
        [styles.primary]: color == "primary",
        [styles.fullWidth]: fullWidth == true,
      })}
      {...props}
    >
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  );
};

export default Tag;
