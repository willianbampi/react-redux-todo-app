import axios from 'axios'

const URL = 'http://localhost:3003/api/todos'

export const changedDescription = event => ({
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
})

export const search = () => {
    return (dispacth, getState) => {
        const description = getState().todo.description
        const search = description ? `&description__regex=/${description}/` : ''
        const request = axios.get(`${URL}?sort=-createdAt${search}`)
            .then(response => dispacth({
                type: 'TODO_SEARCHED', 
                payload: response.data
            }))
    }
}

export const add = (description) => {
    return dispacth => {
        axios.post(URL, {description})
            .then(response => dispacth(clear()))
            .then(response => dispacth(search()))
    }
}

export const markAsDone = (todo) => {
    return dispacth => {
        axios.put(`${URL}/${todo._id}`, {...todo, done: true})
            .then(response => dispacth(search()))
    }
}

export const markAsPending = (todo) => {
    return dispacth => {
        axios.put(`${URL}/${todo._id}`, {...todo, done: false})
            .then(response => dispacth(search()))
    }
}

export const remove = (todo) => {
    return dispacth => {
        axios.delete(`${URL}/${todo._id}`)
            .then(response => dispacth(search()))
    }
}

export const clear = () => {
    return [{type: 'TODO_CLEAR'}, search()]
}