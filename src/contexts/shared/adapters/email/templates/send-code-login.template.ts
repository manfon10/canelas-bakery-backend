import { baseTemplate } from './base.template';

export const renderCodeLogin = (code: string): string => {
  const content = `
    <div style="padding: 20px;">
      <p>Recientemente hemos recibido una solicitud para iniciar sesión. 
        Para continuar, por favor utiliza el siguiente código de verificación:</p>

      <div class="code">${code}</div>

      <p>El código tiene un tiempo de 10 minutos para ser utilizado.</p>

      <p>Saludos cordiales.</p>
    </div>
  `;

  return baseTemplate(content, 'Codigo de acceso');
};
