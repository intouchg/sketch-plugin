module.exports = {
    addons: [
        'storybook-addon-playroom',
        '@storybook/addon-a11y',
        '@storybook/addon-knobs',
        '@storybook/addon-viewport/register',
    ],
    stories: [
        '../stories/**/*.stories.@(tsx|jsx)',
    ],
}