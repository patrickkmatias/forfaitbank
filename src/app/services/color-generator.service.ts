import { Injectable } from '@angular/core';

@Injectable()
export class ColorGeneratorService {

  /**
   * Color of the project logo (🧳)
   *
   * @type {HSL}
   */
  private BASE_ICON_COLOR: HSL = {
    h: 193,
    s: 10,
    l: 66,
    css: `hsl(193, 10%, 66%)`,
  };

  constructor() {}

  /**
   * Turns a hexadecimal color code into an
   * inline RGB css color code
   *
   * @param {string} H Hex. Color
   * @return {*}  {string} RGB CSS Code
   */
  private hexToRGB(H: string): string {
    let r = '0',
      g = '0',
      b = '0';

    // 3 digits
    if (H.length == 4) {
      r = '0x' + H[1] + H[1];
      g = '0x' + H[2] + H[2];
      b = '0x' + H[3] + H[3];
      // 6 digits
    } else if (H.length == 7) {
      r = '0x' + H[1] + H[2];
      g = '0x' + H[3] + H[4];
      b = '0x' + H[5] + H[6];
    }

    return `rgb(${r}, ${g}, ${b})`;
  }

  /**
   * Turns a hex color first to RGB and then
   * in a HSL color, and returns a HSL object
   * with HSL values and HSL CSS color code
   *
   * @param {string} H Hex. Color
   * @return {*}  {HSL} HSL Object
   */
  private hexToHSL(H: string): HSL {
    // first to RGB
    let r: any = '0',
      g: any = '0',
      b: any = '0';

    if (H.length == 4) {
      r = '0x' + H[1] + H[1];
      g = '0x' + H[2] + H[2];
      b = '0x' + H[3] + H[3];
    } else if (H.length == 7) {
      r = '0x' + H[1] + H[2];
      g = '0x' + H[3] + H[4];
      b = '0x' + H[5] + H[6];
    }

    // then to HSL

    r /= 255;
    g /= 255;
    b /= 255;

    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    // Calculate hue
    // No difference
    if (delta == 0) h = 0;
    // Red is max
    else if (cmax == r) h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g) h = (b - r) / delta + 2;
    // Blue is max
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) h += 360;
    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    let result: HSL = {
      h: h,
      s: s,
      l: l,
      css: `hsl(${h}, ${s}%, ${l}%)`,
    };

    return result;
  }

  /**
   *  It receives a base color and a target color and
   *  returns an inline css filter with corrected values
   *  to display the target color
   *
   * @param {HSL} bc Base color
   * @param {HSL} tc Target color
   * @return {string} CSS Filter
   */
  private correctHSLColor(bc: HSL, tc: HSL): string {
    tc.h -= bc.h;
    tc.s = 100 + (tc.s - bc.s);
    tc.l = 100 + (tc.l - bc.l);

    let filter = `hue-rotate(${tc.h}deg) saturate(${tc.s}%) brightness(${tc.l}%)`;

    return filter;
  }

  /**
   * Generates a random hexadecimal color code.
   *
   * @return {*}  {string} Hex. Color
   * @memberof ColorGeneratorService
   */
   public generateRandomHexColor(): string {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
  }

  /**
   * Corrects the color of the project
   * logo.
   *
   * @param {string} H Hex. Color
   * @return {*}  {string} CSS Filter
   * @memberof ColorGeneratorService
   */
  public correctIconColor(H: string): string {
    let hsl = this.hexToHSL(H)
    return this.correctHSLColor(this.BASE_ICON_COLOR, hsl);
  }

  /**
   * It generates a HSL color palette with steps
   * from a hexadecimal color.
   *
   * @param {string} H Hex. Color
   * @return {*}  {ColorPalette} Color Palette
   * @memberof ColorGeneratorService
   */
  public generateColorPalette(H: string): ColorPalette {
    let hsl: HSL = this.hexToHSL(H);

    let cp: ColorPalette =
    {
      h: hsl.h,
      s: hsl.s,
      l: hsl.l,
      css: hsl.css,
      50: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l + 50}%)`,
      100: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l + 40}%)`,
      200: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l + 30}%)`,
      300: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l + 20}%)`,
      400: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l + 10}%)`,
      500: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      600: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l - 10}%)`,
      700: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l - 20}%)`,
      800: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l - 30}%)`,
      900: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l - 40}%)`,
    }

    return cp;
  }

}

interface HSL {
  h: number;
  s: number;
  l: number;
  css: string;
}


/**
 * Color palette with ten steps.
 *
 * @interface ColorPalette
 * @extends {HSL}
 */
interface ColorPalette extends HSL {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}
