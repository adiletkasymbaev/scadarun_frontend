export type IconBaseProps = Omit<React.SVGProps<SVGSVGElement>, "color">;

/** 1) Автотрансформатор однообмоточный */
export type AutoTransformerSingleWindingColors = {
  ring?: string; // круг
  link?: string; // линия
};

/** 2) Автотрансформатор двухобмоточный вертикальный */
export type AutoTransformerTwoWindingVerticalColors = {
  ringTop?: string;
  ringBottom?: string;
  link?: string;
};

/** 3) Автотрансформатор двухобмоточный горизонтальный */
export type AutoTransformerTwoWindingHorizontalColors = {
  ringLeft?: string;
  ringRight?: string;
  link?: string;
};

/** 4) Бустер */
export type BoosterColors = {
  ring?: string;
};

/** 5) Двухобмоточный трансформатор */
export type TwoWindingTransformerColors = {
  ringTop?: string;
  ringBottom?: string;
};

/** 6) Трехобмоточный трансформатор */
export type ThreeWindingTransformerColors = {
  ringTop?: string;
  ringLeft?: string;
  ringRight?: string;
};

/** 7) Трехобмоточный автотрансформатор */
export type ThreeWindingAutoTransformerColors = {
  ringTop?: string;
  ringLeft?: string;
  ringRight?: string;
  link?: string;
};

/** 8) Четырехобмоточный трансформатор */
export type FourWindingTransformerColors = {
  ringTop?: string;
  ringBottom?: string;
  ringLeft?: string;
  ringRight?: string;
};

/** 9) Четырехобмоточный трансформатор альт */
export type FourWindingTransformerAltColors = {
  ringTop?: string;
  ringCenter?: string;
  ringLeftBottom?: string;
  ringRightBottom?: string;
};

/** 10) Четырехобмоточный автотрансформатор */
export type FourWindingAutoTransformerColors = {
  ringTop?: string;
  ringBottom?: string;
  ringRight?: string;
  ringLeft?: string; // в исходнике "black"
  link?: string;
};

/** 11) Пятиобмоточный трансформатор */
export type FiveWindingTransformerColors = {
  ringTopRight?: string;
  ringTopLeft?: string;
  ringBottomRight?: string;
  ringBottomCenter?: string;
  ringBottomLeft?: string; // в исходнике "black"
};


/** 12) Четырехобмоточный трансформатор альт 2 */
export type FourWindingTransformerAlt2Colors = {
  ringTopLeft?: string;
  ringTopRight?: string;
  ringBottomLeft?: string;
  ringBottomRight?: string;
};