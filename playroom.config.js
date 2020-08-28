module.exports = {
    components: './playroom/components.js',
    outputPath: './dist/playroom',

    // Optional:
    title: 'Intouch Design System',
    // themes: './playroom/themes.js',
    snippets: './playroom/snippets.js',
    frameComponent: './playroom/FrameComponent.js',
    widths: [320, 768, 1024],
    port: 9000,
    openBrowser: false,
    // paramType: 'search', // default is 'hash'
    exampleCode: `
    <Button>
        Click Me!
    </Button>
    `,
    baseUrl: '/playroom/',
    // webpackConfig: () => ({
    // // Custom webpack config goes here...
    // }),
    iframeSandbox: 'allow-scripts',
}
