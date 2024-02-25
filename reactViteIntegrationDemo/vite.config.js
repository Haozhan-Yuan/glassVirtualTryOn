import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { createHtmlPlugin  } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          modelControls: `
            <div id="modelControls" style="position: fixed; bottom: 20px; left: 20px;">
              <button id="model1Button" class="JeelizVTOWidgetButton">Model 1</button>
              <button id="model2Button" class="JeelizVTOWidgetButton">Model 2</button>
              <!-- Additional buttons can be added here -->
            </div>
            <script>
              document.addEventListener('DOMContentLoaded', function() {
                const model1Button = document.getElementById('model1Button');
                const model2Button = document.getElementById('model2Button');
                
                model1Button.addEventListener('click', function() {
                  window.set_glassesModel('rayban_aviator_or_vertFlash');
                });

                model2Button.addEventListener('click', function() {
                  window.set_glassesModel('rayban_round_cuivre_pinkBrownDegrade');
                });
              });
            </script>
          `
        }
      }
    })
  ]
});