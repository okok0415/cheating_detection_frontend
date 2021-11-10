import React from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination, useSortBy } from 'react-table'
// A great library for fuzzy filtering/sorting items
import { matchSorter } from 'match-sorter'
// @ts-ignore
// Define a default UI for filtering
function GlobalFilter({
    // @ts-ignore
    preGlobalFilteredRows,
    // @ts-ignore
    globalFilter,
    // @ts-ignore
    setGlobalFilter,
}) {
    //const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <tr role="row" className="global-filter">
            <th colSpan={1} role="columnheader">

                전체 검색 :{' '}

            </th>
            <th colSpan={13} role="columnheader">
                <input
                    value={value || ""}
                    onChange={e => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder={`검색어를 입력하시오.`}
                    style={{
                        width: '450px',
                        fontSize: '1.1rem',
                        border: '0',
                    }}
                />
            </th>
        </tr>
    )
}

// Define a default UI for filtering
function DefaultColumnFilter({
    column: {   // @ts-ignore
        filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            className="search"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

function NameColumnFilter({
    column: {     // @ts-ignore
        filterValue, preFilteredRows, setFilter },
}) {
    //const count = preFilteredRows.length

    return (
        <input
            className="search"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`이름을 입력하세요`}
        />
    )
}


function AddressColumnFilter({
    column: {     // @ts-ignore
        filterValue, preFilteredRows, setFilter },
}) {
    //const count = preFilteredRows.length

    return (
        <input
            className="search"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`주소를 입력하세요`}
        />
    )
}



function PhoneColumnFilter({
    column: {     // @ts-ignore
        filterValue, preFilteredRows, setFilter },
}) {
    //const count = preFilteredRows.length

    return (
        <input
            className="search"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`전화번호를 입력하세요`}
        />
    )
}
function MedicalRecordsColumnFilter({
    column: {     // @ts-ignore
        filterValue, preFilteredRows, setFilter },
}) {
    //const count = preFilteredRows.length

    return (
        <input
            className="search"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`진료기록을 입력하세요`}
        />
    )
}
// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
    column: {     // @ts-ignore
        filterValue, setFilter, preFilteredRows, id },
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach((row: any) => {
            options.add(row.values[id])
        })
        // @ts-ignore
        return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
        <select
            className="select"
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
        >
            <option value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}

function BooleanColumnFilter({
    column: {     // @ts-ignore
        filterValue, setFilter, preFilteredRows, id },
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    /*
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])
    */
    // Render a multi-select box
    return (
        <select
            className="select"
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
        >
            <option value="">All</option>
            <option value="true">양호</option>
            <option value="false" >불량</option>
        </select>
    )
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function SliderColumnFilter({
    column: {     // @ts-ignore
        filterValue, setFilter, preFilteredRows, id },
}) {
    // Calculate the min and max
    // using the preFilteredRows

    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        preFilteredRows.forEach((row: any) => {
            min = Math.min(row.values[id], min)
            max = Math.max(row.values[id], max)
        })
        return [min, max]
    }, [id, preFilteredRows])

    return (
        <>
            <input
                type="range"
                min={min}
                max={max}
                value={filterValue || min}
                onChange={e => {
                    setFilter(parseInt(e.target.value, 10))
                }}
            />
            <div className="range-span">스크롤된 횟수 이상을 표시합니다.</div>

        </>
    )

    //<button onClick={() => setFilter(undefined)}>Off</button>
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
    column: {     // @ts-ignore
        filterValue = [], preFilteredRows, setFilter, id },
}) {
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        preFilteredRows.forEach((row: any) => {
            min = Math.min(row.values[id], min)
            max = Math.max(row.values[id], max)
        })
        return [min, max]
    }, [id, preFilteredRows])

    return (
        <div
            style={{
                display: 'block',
            }}
        >
            <input
                className="numRangePrevious"
                value={filterValue[0] || ''}
                type="number"
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
                }}
                placeholder={`최소 (${min})`}

            />
            <div> ~ </div>
            <input
                className="numRangeNext"
                value={filterValue[1] || ''}
                type="number"
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
                }}
                placeholder={`최대 (${max})`}
            />
        </div>
    )
}

function fuzzyTextFilterFn(     // @ts-ignore
    rows, id, filterValue) {
    // @ts-ignore
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val: any) => !val
/*
function DateRangeColumnFilter({
    column: { filterValue = [], preFilteredRows, setFilter, id }
}) {
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? new Date(preFilteredRows[0].values[id]).getTime() : 0;
        let max = preFilteredRows.length ? new Date(preFilteredRows[0].values[id]).getTime() : 0;

        preFilteredRows.forEach((row) => {
            min = Math.min(new Date(row.values[id]).getTime(), min);
            max = Math.max(new Date(row.values[id]).getTime(), max);
        });
        return [min, max];
    }, [id, preFilteredRows]);

    return (
        <div style={{ display: "flex" }}>
            <input
                value={filterValue[0] || ""}
                type="date"
                onChange={(e) => {
                    const val = e.target.value;
                    setFilter((old = []) => [val || undefined, old[1]]);
                }}
                style={{
                    width: "70px",
                    marginRight: "0.5rem"
                }}
            />
            to
            <input
                value={filterValue[1] || ""}
                type="date"
                onChange={(e) => {
                    const val = e.target.value;
                    setFilter((old = []) => [old[0], val || undefined]);
                }}
                style={{
                    width: "70px",
                    marginLeft: "0.5rem"
                }}
            />
        </div>
    );
}

function dateBetweenFilterFn(rows, id, filterValues) {
    let sd = new Date(filterValues[0]);
    let ed = new Date(filterValues[1]);
    console.log(rows, id, filterValues)
    return rows.filter(r => {
        var time = new Date(r.values[id]);
        console.log(time, ed, sd)
        if (filterValues.length === 0) return rows;
        return (time >= sd && time <= ed);
    });
}

dateBetweenFilterFn.autoRemove = val => !val;

*/
function DateRangeColumnFilter({
    column: {
        // @ts-ignore
        filterValue = [], preFilteredRows, setFilter, id
    } }) {
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? new Date(preFilteredRows[0].values[id]) : new Date(0)
        let max = preFilteredRows.length ? new Date(preFilteredRows[0].values[id]) : new Date(0)

        preFilteredRows.forEach((row: any) => {
            const rowDate = new Date(row.values[id])

            min = rowDate <= min ? rowDate : min
            max = rowDate >= max ? rowDate : max
        })

        return [min, max]
    }, [id, preFilteredRows])

    return (
        <div>
            <input
                className="daterange-previous"
                min={min.toISOString().slice(0, 10)}
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [val ? val : undefined, old[1]])
                }}
                type="date"
                value={filterValue[0] || ''}
            />
            <div>
                {' ~ '}
            </div>
            <input
                className="daterange-next"
                max={max.toISOString().slice(0, 10)}
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [old[0], val ? val.concat('T23:59:59.999Z') : undefined])
                }}
                type="date"
                // @ts-ignore
                value={filterValue[1]?.slice(0, 10) || ''}
            />
        </div>
    )
}

function dateBetweenFilterFn(    // @ts-ignore
    rows, id, filterValues) {
    let sd = filterValues[0] ? new Date(filterValues[0]) : undefined
    let ed = filterValues[1] ? new Date(filterValues[1]) : undefined

    if (ed || sd) {
        return rows.filter((r: any) => {
            var time = new Date(r.values[id])

            if (ed && sd) {
                return (time >= sd && time <= ed)
            } else if (sd) {
                return (time >= sd)
            } else if (ed) {
                return (time <= ed)
            }
        })
    } else {
        return rows
    }
}
// Our table component
function Table({     // @ts-ignore
    columns, data }) {


    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            dateBetween: dateBetweenFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (    // @ts-ignore
                rows, id, filterValue) => {
                return rows.filter((row: any) => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        // @ts-ignore
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // @ts-ignore
        page, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions,
        // @ts-ignore
        gotoPage, pageCount, setPageSize, prepareRow, state, preGlobalFilteredRows, setGlobalFilter,

    } = useTable(
        {
            columns,
            data,
            // @ts-ignore
            defaultColumn,
            // Be sure to pass the defaultColumn option
            filterTypes,
            initialState: {
                // @ts-ignore
                sortBy: [
                    {
                        id: 'name',
                        desc: false

                    },
                    {
                        id: 'alarm-date',
                        desc: true
                    },
                    {
                        id: 'sensor-name',
                        desc: false
                    }
                ]

            }
        },
        useFilters, // useFilters!
        useGlobalFilter, // useGlobalFilter!
        useSortBy,
        usePagination,
    )

    // We don't want to render all of the rows for this example, so cap
    // it for this use case
    // const firstPageRows = rows.slice(0, 10)
    // @ts-ignore
    const { pageIndex, pageSize } = state


    return (
        <>
            <table className="table" {...getTableProps()}>
                <thead>
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        // @ts-ignore
                        globalFilter={state.globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} style={{ verticalAlign: 'top' }}>
                            {headerGroup.headers.map(column => (
                                // @ts-ignore
                                <th className={column.className} {...column.getHeaderProps()} sorted={column.sorted}>

                                    <span     // @ts-ignore
                                        {...column.getSortByToggleProps()}>
                                        {column.render('Header')}
                                        {/* @ts-ignore */}
                                        {column.isSorted ? (column.isSortedDesc ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>) : ""}
                                    </span>
                                    {/* @ts-ignore */}

                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="alarm-tbody" {...getTableBodyProps()}>
                    {page.map((row: any, i: any) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell: any) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="page">

                <div className="pagePN">

                    <span className="movepage">
                        페이지 이동: {' '}
                        <input type='number' defaultValue={pageIndex + 1}
                            onChange={e => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(pageNumber)
                            }}
                            style={{ width: '50px' }} />
                    </span>
                    <span>
                        페이지{' '}
                        <strong>
                            {pageIndex + 1} / {pageOptions.length}
                        </strong> {' '}
                    </span>
                    <div className="btn-grid">
                        {/* @ts-ignore */}
                        <div className="button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</div>
                        {/* @ts-ignore */}
                        <div className="button" onClick={() => previousPage()} disabled={!canPreviousPage}>이전</div>
                        {/* @ts-ignore */}
                        <div className="button" onClick={() => nextPage()} disabled={!canNextPage}>이후</div>
                        {/* @ts-ignore */}
                        <div className="button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</div>
                    </div>
                    <select className="select" value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                        {
                            [10, 25, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}개씩 보기
                                </option>
                            ))
                        }
                    </select>
                </div>

            </div>
        </>
    )
}

// Define a custom filter filter function!
function filterGreaterThan(                                    // @ts-ignore
    rows, id, filterValue) {
    return rows.filter((row: any) => {
        const rowValue = row.values[id]
        return rowValue >= filterValue
    })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val: any) => typeof val !== 'number'


export { Table, SliderColumnFilter, NumberRangeColumnFilter, SelectColumnFilter, filterGreaterThan, NameColumnFilter, AddressColumnFilter, PhoneColumnFilter, MedicalRecordsColumnFilter, DateRangeColumnFilter, BooleanColumnFilter };