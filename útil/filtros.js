import moment from 'moment';
import matchSorter from 'match-sorter';

moment.locale('pt-BR');

export const filtrarData = (filter, rows) => (
    rows.filter(r => {
        const format = moment(r[filter.id]).format('L');
        return new RegExp(filter.value, 'i').test(format);
    })
);


export const filtrarTexto = (filter, rows) => (
    matchSorter(rows, filter.value, {keys: [filter.id]})
);