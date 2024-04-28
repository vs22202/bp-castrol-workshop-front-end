/**
 * This SvgIcon component renders an SVG icon dynamically imported using the useDynamicSvgImport hook.
 * It provides optional wrapper styles and additional SVG properties.
 *
 * @component
 * @example
 * // Basic usage
 * <SvgIcon iconName="exampleIcon" />
 *
 * // With wrapper style
 * <SvgIcon iconName="exampleIcon" wrapperStyle="customStyle" />
 *
 * // With additional SVG properties
 * <SvgIcon iconName="exampleIcon" svgProp={{ fill: 'red' }} />
 *
 * @param {Object} props - The props for the SvgIcon component.
 * @param {string} props.iconName - The name of the SVG icon to be rendered.
 * @param {string} [props.wrapperStyle] - The optional wrapper style for the SVG icon.
 * @param {React.SVGProps<SVGSVGElement>} [props.svgProp] - The optional additional SVG properties.
 *
 * @returns {JSX.Element} The rendered SvgIcon component.
 */

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
