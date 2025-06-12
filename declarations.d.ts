// declarations.d.ts
declare module 'base-64' {
    export function encode(input: string): string;
    export function decode(input: string): string;
  }

  declare module 'xml2js' {
    export function parseString(xml: string, callback: (err: Error, result: any) => void): void;
  }  
  