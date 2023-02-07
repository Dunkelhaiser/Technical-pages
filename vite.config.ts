import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                generator: resolve(__dirname, "generator.html"),
                reader: resolve(__dirname, "reader.html"),
            },
        },
    },
});
