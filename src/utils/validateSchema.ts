
// Validar os dados do formulário
import * as yup from 'yup';

// Validar o formulário com YUP
const validateSchemaForm = yup.object({
  name: yup.string().required('Error: Necessário preencher o campo nome!'),
  email: yup.string()
    .required('Error: Necessário preencher o campo e-mail!')
    .email('Error: Necessário preencher com e-mail válido!'),
  password: yup.string()
    .required('Error Aqui: Necessário preencher o campo senha!')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  situationId: yup.number()
    .required('Error: Necessário preencher o campo situação!')
    .integer('Error: Necessário preencher o compo situação!')
    .positive('Error: Necessário preencher o compo situação!'),
});

// Validar o Login com YUP
const validateSchemaLogin = yup.object({
  email: yup.string()
    .required('Error: Necessário preencher o campo usuário.')
    .email('Error: Necessário preencher o campo com um e-mail válido.'),
  password: yup.string()
    .required('Error Aqui: Necessário preencher o campo senha!')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

// Validar o Recuperar Senha com YUP
const validateSchemaEditPassword = yup.object({
  password: yup.string()
    .required('Error: Necessário preencher o campo senha!')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
});



// Validar o Recuperar Senha com YUP
const validateSchemaRecoverPassword = yup.object({
  email: yup.string()
    .required('Error: Necessário preencher email válido.')
    .email('Error: Necessário preencher o campo com um e-mail válido.'),
});

// Validar o Editar usuário com YUP
const validateSchemaEdit = yup.object({
  name: yup.string().required('Error: Necessário preencher o campo nome!'),
  email: yup.string()
    .required('Error: Necessário preencher o campo e-mail!')
    .email('Error: Necessário preencher com e-mail válido!'),
});

// Exporto as validações
export {
  validateSchemaForm,
  validateSchemaLogin,
  validateSchemaRecoverPassword,
  validateSchemaEdit,
  validateSchemaEditPassword
}
