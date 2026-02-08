import { baseTemplate } from './base.template';

export const renderRegisterUser = (code: string): string => {
  const content = `
    <div style="padding: 20px;">
      <p>Recientemente hemos recibido una solicitud para la creación de tu cuenta. 
        Para continuar, por favor utiliza el siguiente código de verificación:</p>

      <div class="code">${code}</div>

      <p>El código tiene un tiempo de 10 minutos para ser utilizado.</p>

      <p>Saludos cordiales.</p>
    </div>
  `;

  return baseTemplate(content, 'Confirma tu cuenta');
};
