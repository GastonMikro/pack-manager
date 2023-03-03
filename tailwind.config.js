const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                
            },
            colors: {
                pack: {
                  100: '#b03407',
                },
                gris:{100:"#F7F7F7"}
              },

              height: {
                pack: '93vh',
              },

              minHeight: {
                pack: '93vh',
              }
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
