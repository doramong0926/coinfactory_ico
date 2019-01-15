export default {
    maxCharacters: str => str.split("").length > 7,
    hasNumber: str => /\d/.test(str),
    hasUppercase: str => /[A-Z]/.test(str),
    hasSpecial: str => /[[({}))\]!@#?$%^&*,./|`\\]/.test(str)
};