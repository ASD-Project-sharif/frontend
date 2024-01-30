import { AutoComplete, Input } from 'antd';
import { useContext, useState } from 'react';
import { sliceText } from '../helper/strings';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import axios from 'axios';
import config from '../config/config';

const renderTitle = (title) => (
    <h3>
        {title}
    </h3>
);

const SearchBar = () => {
    const [options, setOptions] = useState([]);
    const { state } = useContext(AuthContext);
    const navigate = useNavigate();

    const renderItem = (record) => {
        const path = `/user/ticket/${record._id}`
        return ({
            value: record.title,
            label: (
                <div className='auto-complete-item' onClick={() => navigate(path)}>
                    <h4>{record.title}</h4>
                    <span>{sliceText(record.description)}</span>
                </div>

            ),
        })
    };

    const handleChange = async (e) => {
        const searchInput = e.target.value;
        if (searchInput === "") {
            setOptions([]);
        } else {
            const headers = { "x-access-token": state.token }
            const response = await axios.get(
                `${config.baseUrl}/api/v1/ticket/search/${searchInput}`,
                { headers: headers },
            );
            const options = [{
                label: renderTitle('تیکت‌ها با بیشترین تطابق'),
                options: response.data.tickets.map(item => renderItem(item)),
            }];
            setOptions(options);
        }
    }
    return (
        <div className='auto-complete'>
            <AutoComplete
                style={{ width: "50%" }}
                options={options}
            >
                <Input.Search size="large" placeholder="بخشی از متن تیکت را وارد کنید" onChange={handleChange} />
            </AutoComplete>
        </div>

    )
}

export default SearchBar;