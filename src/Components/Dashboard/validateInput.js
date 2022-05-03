export default function validateInput(values) {
    let errors = {};

    if (values.title === '') {
        errors.title = 'Required'
    }

    if (values.title && values.title.length > 15) {
        errors.title = 'Invalid';
    }
    if (values.assignee === '') {
        errors.assignee = 'Required'
    }
    if (values.assignee && !(/^[a-zA-Z ]+$/.test(values.assignee))) {
        errors.assignee = 'Invalid';
    }
    if (values.assignee && values.assignee.length > 20) {
        errors.assignee = 'Invalid';
    }
    if (values.deadline === null) {
        errors.deadline = 'Required'
    }
    if (values.status === null) {
        errors.status = 'Required'
    }

    return errors;
}