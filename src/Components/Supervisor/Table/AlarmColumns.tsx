import { NumberRangeColumnFilter, SelectColumnFilter, NameColumnFilter, AddressColumnFilter, PhoneColumnFilter, MedicalRecordsColumnFilter } from "./Table";
import { Link } from "react-router-dom";
export const COLUMNS = [
    {

        Header: '알람 발생 시각',
        accessor: 'time',
        Filter: NameColumnFilter,
        filter: 'fuzzyText',
        className: 'PIC',
    },
    {

        Header: '참가자',
        accessor: 'username',
        filter: 'fuzzyText',
        className: 'PIC',
    },
    {

        Header: '내용',
        accessor: 'cheating',
        Filter: NameColumnFilter,
        filter: 'fuzzyText',
        className: 'PIC',
    },
    {

        Header: 'X 좌표',
        accessor: 'x',
        Filter: NameColumnFilter,
        filter: 'fuzzyText',
        className: 'PIC',
    },
    {

        Header: 'Y 좌표',
        accessor: 'y',
        Filter: NameColumnFilter,
        filter: 'fuzzyText',
        className: 'PIC',
    },

]

