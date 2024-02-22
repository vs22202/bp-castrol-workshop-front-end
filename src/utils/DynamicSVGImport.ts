import React, { ReactComponentElement, useEffect, useRef, useState } from "react";


/**
 * Dynamically import the mentioned svg name in props
 * @param svgName The name of the desired svg file in the assets folder
 * @returns {{error: unknown,loading: boolean,Svg: React.FC<React.SVGProps<SVGElement>> | undefined;}}
 */
export function useDynamicSvgImport(svgName: string) {
  const importedIconRef = useRef<React.FC<React.SVGProps<SVGElement>>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    setLoading(true);
    const importSvgIcon = async (): Promise<void> => {
        try {
        importedIconRef.current = 
          (await import(`../assets/${svgName}.svg?react`)).default
        ;
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    importSvgIcon();
  }, [svgName]);

  return { error, loading, Svg: importedIconRef.current };
}