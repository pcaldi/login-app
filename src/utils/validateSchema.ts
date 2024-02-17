
// Validar os dados do formulário
import * as yup from 'yup';

// Validar o formulário com YUP
const validateSchemaForm = yup.object({
  name: yup.string().required('Error: Necessário preencher o campo nome!'),
  email: yup.string()
    .required('Error: Necessário preencher o campo e-mail!')
    .email('Error: Necessário preencher com e-mail válido!'),
  password: yup.string()
    .required('Error: Necessário preencher o campo senha!')
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
});

// Validar o Login com YUP
const validateSchemaLogin = yup.object({
  email: yup.string()
    .required('Error: Necessário preencher o campo usuário.')
    .email('Error: Necessário preencher o campo com um e-mail válido.'),
  password: yup.string().required('Error: Necessário preencher o campo senha.')
});


// Validar o Recuperar Senha com YUP
const validateSchemaRecoverPassword = yup.object({
  email: yup.string()
    .required('Error: Necessário preencher email válido.')
    .email('Error: Necessário preencher o campo com um e-mail válido.'),
});

// Exporto as validações
export { validateSchemaForm, validateSchemaLogin, validateSchemaRecoverPassword }
