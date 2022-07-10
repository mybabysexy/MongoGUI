import React, {useEffect, useState, useMemo, useCallback} from 'react';
import cs from './style.module.scss';
import HeaderActions from "./HeaderActions";
import moment from "moment";
import {isMobile} from '../../helpers/utils';
import {useQuery} from "react-query";
import {useSelector} from "react-redux";

const renderItem = (key, value) => {
    if (!value) return null;
    return <div key={key} className={cs['tab-table__field']}>
        <div className={cs['tab-table__title']}>{key}</div>
        <div className={cs['tab-table__value']}>{value}</div>
    </div>
}

const renderHeaderItem = (row) => {
    const {_id, title} = row;
    if (title) return <div className={cs['tab-table__heading']}>Title: {title}</div>
    if (_id) return <div className={cs['tab-table__heading']}>_id: {_id}</div>;
}

const TabBody = ({tab}) => {
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [header, setHeader] = useState([]);
    const {tabs, activeTabId} = useSelector(state => state.tabs);

    const currentTabData = useMemo(() => tabs.find(item => item.id === activeTabId), [
        activeTabId, tabs,
    ]);

    const fetchData = useCallback(() => {
        const activeFilters = currentTabData.filters.filter(item => item.enabled);
        const filters = activeFilters.map(item => ({
            field: item.name,
            operator: item.operator,
            type: item.type,
            value: item.value
        }));
        return window.axios.get(`/api/collection/${tab.name}?filters=${JSON.stringify(filters)}`);
    }, [currentTabData]);

    const onSuccess = useCallback(({data, total, last_page}) => {
        let headers = [];
        data.forEach(row => {
            headers = [
                ...headers,
                ...Object.keys(row)
            ];
        });
        headers = [...new Set(headers.filter(header => header !== '_id'))];
        headers = headers.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1);
        headers = [
            '_id',
            ...headers
        ];
        if (headers.length > 1) {
            setHeader(headers);
        }

        setRows(data);
        setTotal(total);
        setLastPage(last_page);
    }, []);

    const {refetch} = useQuery(['tab', tab.id], fetchData, {
        refetchOnWindowFocus: false,
        onSuccess,
        select({data}) {
            return data;
        },
    });

    useEffect(() => {
        refetch();
    }, [currentTabData.filters, currentTabData.sorts, currentTabData.projections]);

    return <div
        className={`${cs.tab_body} ${activeTabId === tab.id ? cs.tab_body__active : ''}`}>
        {
            isMobile() ? <div className={cs['tab-table']}>
                    {rows.map((row, rowIndex) => {
                        return <div key={rowIndex} className={cs['tab-table__item']}>
                            <div className={cs['tab-table__head']}>
                                {renderHeaderItem(row)}
                            </div>
                            <div className={cs['tab-table__content']}>
                                {
                                    header.map((key, index) => {
                                        let val = row[key];
                                        if (typeof val !== 'object') {
                                            return renderItem(key, val);
                                        } else {
                                            if (window._.get(val, '$oid')) {
                                                return renderItem(key, val.$oid);
                                            } else if (window._.get(val, '$date.$numberLong')) {
                                                return renderItem(key, moment(parseInt(val.$date.$numberLong)).format('DD.MM.YYYY HH:mm:ss'));
                                            } else {
                                                return renderItem(key, JSON.stringify(val));
                                            }
                                        }
                                    })
                                }
                            </div>
                        </div>
                    })
                    }
                </div>
                : <div className={cs.tab_body__content}>
                    <div className={cs.tab_body__table}>
                        <table cellSpacing={0} cellPadding={0}>
                            <thead>
                            <tr>
                                {
                                    header.map((item, index) => {
                                        return <th key={index}>
                                            <div className={cs.tab_body__table__header_text}>{item}</div>
                                            <HeaderActions field={item}/>
                                        </th>
                                    })
                                }
                            </tr>
                            </thead>
                            <tbody>
                            {
                                rows.map((row, rowIndex) => {
                                    return <tr key={rowIndex}>
                                        {
                                            header.map((key, index) => {
                                                let val = row[key];
                                                if (typeof val !== 'object') {
                                                    return <td key={index}>{val}</td>
                                                } else {
                                                    if (window._.get(val, '$oid')) {
                                                        return <td key={index}>{val.$oid}</td>
                                                    } else if (window._.get(val, '$date.$numberLong')) {
                                                        return <td
                                                            key={index}>{moment(parseInt(val.$date.$numberLong)).format('DD.MM.YYYY HH:mm:ss')}</td>
                                                    } else {
                                                        return <td key={index}>{JSON.stringify(val)}</td>
                                                    }
                                                }
                                            })
                                        }
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
        }
        <div className={cs['tab-info']}>
            <div className={cs['tab-info__wrapper']}>
                adadad
            </div>
        </div>
    </div>
}

export default TabBody;
