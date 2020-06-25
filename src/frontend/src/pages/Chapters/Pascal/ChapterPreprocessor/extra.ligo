#if !EXTRA

#define EXTRA

function doSomethingExtra (const str: string) : string is
    String.sub (0n, 2n, str)

#endif