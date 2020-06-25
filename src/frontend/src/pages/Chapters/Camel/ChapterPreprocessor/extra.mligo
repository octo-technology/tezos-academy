#if !EXTRA

#define EXTRA

let doSomethingExtra (str: string) : string =
    String.sub 0n 2n str

#endif