export default function (code: number | undefined) {
  if (typeof code === 'number') {
    if (code > 0xffff) {
      code -= 0x10000;
      return String.fromCharCode(0xd800 + (code >> 10), 0xdc00 + (code & 0x3ff));
    }

    return String.fromCharCode(code);
  }

  return '';
}
