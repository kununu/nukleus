
function hslToRgb (hue, sat, lig) {
  let r;
  let g;
  let b;

  if (sat === 0) {
    r = g = b = lig; // achromatic
  } else {
    const hue2rgb = function hue2rgb (h, s, v) {
      let vAux = v;

      if (v < 0) vAux += 1;
      if (v > 1) vAux -= 1;
      if (vAux < 1 / 6) {
        return h + (((s - h) * 6) * vAux);
      }
      if (vAux < 1 / 2) {
        return s;
      }
      if (vAux < 2 / 3) {
        return h + ((s - h) * ((2 / 3) - vAux) * 6);
      }

      return h;
    };

    const q = lig < 0.5 ? lig * (1 + sat) : (lig + sat) - (lig * sat);
    const p = (2 * lig) - q;

    r = hue2rgb(p, q, hue + (1 / 3));
    g = hue2rgb(p, q, hue);
    b = hue2rgb(p, q, hue - (1 / 3));
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHsl (red, green, blue) {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  let s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d) + (g < b ? 6 : 0); break;
      case g: h = ((b - r) / d) + 2; break;
      case b: h = ((r - g) / d) + 4; break;
      default: break;
    }
    h /= 6;
  }

  return [h, s, l];
}

function toStringWithZeroPad (num) {
  return (num.toString(16).length < 2) ? `0${num.toString(16)}` : num.toString(16);
}

function shade (colorValue, amount) {
  if (colorValue && colorValue.length >= 6) {
    const redValue = parseInt(colorValue.slice(-6, -4), 16);
    const greenValue = parseInt(colorValue.slice(-4, -2), 16);
    const blueValue = parseInt(colorValue.slice(-2), 16);

    const hsl = rgbToHsl(redValue, greenValue, blueValue);
    hsl[2] = Math.min(hsl[2] + amount, 1);

    const rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
    return `#${toStringWithZeroPad(rgb[0])}${toStringWithZeroPad(rgb[1])}${toStringWithZeroPad(rgb[2])}`;
  }
  return null;
}

function lighten (color, amount) {
  return shade(color, amount / 100);
}


function darken (color, amount) {
  return shade(color, (amount / 100) * -1);
}

export {lighten, darken};
