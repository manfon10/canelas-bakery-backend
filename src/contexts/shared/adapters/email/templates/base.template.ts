import { baseStyles } from './styles.template';

export const baseTemplate = (content: string, title: string = 'Canelas Bakery Email') => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    ${baseStyles}
  </head>
  <body>
    <div class="container">
      ${content}
      <div class="footer">
        <p>© ${new Date().getFullYear()} Canelas Bakery. Todos los derechos reservados.</p>
      </div>
    </div>
  </body>
  </html>
`;
