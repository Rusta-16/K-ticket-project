import localFont from 'next/font/local'

export const exo2 = localFont({
    src: [
        {
            path: './fonts/Exo_2/Exo2-VariableFont_wght.ttf',
            style: 'normal',
        },
        {
            path: './fonts/Exo_2/Exo2-Italic-VariableFont_wght.ttf',
            style: 'italic',
        },
    ],
    variable: '--font-exo2',
    display: 'swap',
})