import { setLocale } from 'yup'


setLocale({
    mixed: {
        default: 'Campo nao é valido',
        required: 'O campo é obrigatorio',
    },
    string: {
        email: () => 'o campo precisa conter uma email válido',
        length: ({ length}) =>`O campo tem que ter ${length} caracteres`,
        min: ({ min }) => `O campo tem que ter no minimo ${min} caracteres`,
        max: ({ max }) => `O campo tem que ter no maximo ${max} caracteres`,
    },
    date: {
        min: ({ min }) => `A data precisa ser maior que ${min}`,
        max: ({ max }) => `A data precisa ser menor que ${max}`,
    },
    number: {
        min: ({ min }) => `O campo tem que ter no minimo ${min} caracteres`,
        max: ({ max }) => `O campo tem que ter no maximo ${max} caracteres`,
        integer: () => 'O campo precisa ter um valor inteiro',
        negative: () => 'O campo precisa ter um valor negativo',
        positive: () => 'O campo precisa ter um valor positivo',
        moreThan: ({ more }) => `O campo precisa ter um valor maior que ${more}`,
        lessThan: ({ less }) => `O campo precisa ter um valor menor que ${less}`
    },
    array: {},
    object: {},
    boolean: {},
});