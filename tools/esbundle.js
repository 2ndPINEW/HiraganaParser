import * as esbuild from 'https://deno.land/x/esbuild@v0.12.9/mod.js'

await esbuild.build({
    entryPoints: ["lib/index.mjs"],
    outfile: "tmp/index.bundle.js",
    format: "esm",
    bundle: true,
});

esbuild.stop()