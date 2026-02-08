import { baseTemplate } from './base.template';

export const renderResendCodeLogin = (code: string): string => {
  const content = `
    <div style="padding: 20px;">
      <p>Hemos notado que solicitaste un reenvío de tu código de verificación. 
        Para continuar, utiliza el siguiente código:</p>

      <div class="code">${code}</div>

      <p>El código tiene un tiempo de 5 minutos para ser utilizado.</p>
          
      <p>Si no solicitaste este código, puedes ignorar este mensaje.</p>
        
      <p>Saludos cordiales.</p>
    </div>
  `;

  return baseTemplate(content, 'Reenvío de Código');
};
