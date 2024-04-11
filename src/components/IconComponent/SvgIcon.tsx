import { useDynamicSvgImport } from "../../utils/DynamicSVGImport";
import styles from './SvgIcon.module.css';

interface IProps {
  iconName: string;
  wrapperStyle?: string;
  svgProp?: React.SVGProps<SVGSVGElement>;
}

export function SvgIcon(props: IProps) {
  const { iconName, wrapperStyle, svgProp } = props;
  const { loading, Svg } = useDynamicSvgImport(iconName);

  return (
      <>
      {loading && (
        <span className="rounded-full bg-slate-400 animate-pulse h-8 w-8" role="loading"></span>
      )}
      {Svg && (
          <Svg className={`${styles[wrapperStyle || ""] } ${styles.icon}`} role={iconName} {...svgProp} />
      )}
    </>
  );
}
