
export const validateEmail = (value) => {
  const regexEmail = RegExp(/^(\W|^)[\w.+-]*@(ligph|ligph.co)\.com(\W|$)/);
  return (!value || regexEmail.test(value));
}

export const validatePassword = (value) => {
  if (value.length < 8 && value.length > 0) {
    return true
  }
}

