import countries from 'world-countries';

export interface Country {
  name: string;
  code: string;
  dial: string;
  flag: string;
}

export const ALL_COUNTRIES: Country[] = countries.map((c: any) => {
  const root = c.idd?.root || '';
  const suffix = (c.idd?.suffixes && c.idd.suffixes.length > 0) ? c.idd.suffixes[0] : '';
  const dial = root + suffix;
  const cleanDial = dial.startsWith('+') ? dial : dial ? `+${dial}` : '';
  return {
    name: c.name.common,
    code: c.cca2,
    dial: cleanDial || '+1',
    flag: c.flag
  };
}).sort((a, b) => a.name.localeCompare(b.name));