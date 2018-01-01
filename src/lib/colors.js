export const palette = [
    '#3399cc',
    '#927fb9',
    '#ffcc00',
    '#57b79a',
    '#be53bb',
    '#dd8451',
    '#3969b3',
    '#bed017',
    '#8934a4',
    '#3bcbcb',
    '#6e69cc',
    '#50931f',
    '#c86b74',
    '#fcaf2b',
    '#2eb0de',
    '#c68ccd',
    '#457557',
    '#cc3c71',
    '#985083',
    '#a7b342'
];

const hashCode = string =>
    Math.abs(
        string.split('').reduce((a, b) => {
            const x = (a << 5) - a + b.charCodeAt(0);
            return x & x;
        }, 0)
    );

// for a given string returns a color from colorMap if present,
// or always the same color for a given string
export const getColorForString = (string = '', colorMap = {}) => {
    if (colorMap[string]) {
        return colorMap[string];
    }
    const paletteLength = palette.length;
    const index = hashCode(string) % paletteLength;
    const color = palette[index];
    return color;
};
