import React, {useContext, useEffect, useState, useMemo} from 'react';
import cs from './style.module.scss';
import DataContext from "../../contexts/DataContext";
import HeaderActions from "./HeaderActions";
import moment from "moment";

const TabBody = ({tab}) => {
    const {data} = useContext(DataContext);
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [header, setHeader] = useState([]);

    const currentTabData = useMemo(() => data.tabs.find(item => data.currentTab && item.id === data.currentTab.id), [data.currentTab, data.tabs]);

    const getData = window._.debounce(() => {
        const activeFilters = currentTabData.filters.filter(item => item.enabled);
        const filters = activeFilters.map(item => ({
            field: item.name,
            operator: item.operator,
            type: item.type,
            value: item.value
        }));
        window.axios.get(`/api/collection/${tab.name}?filters=${JSON.stringify(filters)}`).then(({data}) => {
            let headers = [];
            data.data.forEach(row => {
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
            if(headers.length > 1) {
                setHeader(headers);
            }

            setRows(data.data);
            setTotal(data.total);
            setLastPage(data.last_page);
        });
    }, 1000);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getData();
    }, [currentTabData.filters, currentTabData.sorts, currentTabData.projections]);

    return <div
        className={`${cs.tab_body} ${data.currentTab && data.currentTab.id === tab.id ? cs.tab_body__active : ''}`}>
        {
            <div className={cs.tab_body__content}>
                <div className={cs.tab_body__table}>
                    <table cellSpacing={0} cellPadding={0}>
                        <thead>
                        <tr>
                            {
                                header.map((item, index) => {
                                    return <th key={index}>
                                        <div className={cs.tab_body__table__header_text}>{item}</div>
                                        <HeaderActions field={item} />
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
                                            if(typeof val !== 'object') {
                                                return <td key={index}>{val}</td>
                                            } else {
                                                if(window._.get(val, '$oid')) {
                                                    return <td key={index}>{val.$oid}</td>
                                                } else if(window._.get(val, '$date.$numberLong')) {
                                                    return <td key={index}>{moment(parseInt(val.$date.$numberLong)).format('DD.MM.YYYY HH:mm:ss')}</td>
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
