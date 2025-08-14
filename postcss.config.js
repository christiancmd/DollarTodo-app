// postcss.config.js
import tailwindcssPostcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default {
  plugins: [
    tailwindcssPostcss({
      config: './tailwind.config.js', // Asegúrate de que este path sea correcto
    }),
    autoprefixer(),
  ],
}