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



const items = [{
    "id": "123",
    "user": "ali",
    "description": "الگویی است که از آن برای تسهیل ارتباط و هماهنگی بین اجزای یک سیستم توزیع شده استفاده می‌شود. در این الگو یک موجودیت مرکزی به نام broker وظیفه ارتباط بین اجزا را برعهده دارد که این امر به decoupling کمک می‌کند.",
    "created_at": 1703613489000,
    "status": "open",
    "title": "ali",
    "deadlineStatus": "near"
},
{
    "id": "123",
    "user": "ali",
    "description": "الگویی است که از آن برای تسهیل ارتباط و هماهنگی بین اجزای یک سیستم توزیع شده استفاده می‌شود. در این الگو یک موجودیت مرکزی به نام broker وظیفه ارتباط بین اجزا را برعهده دارد که این امر به decoupling کمک می‌کند.",
    "created_at": 1703613489000,
    "status": "open",
    "title": "gholam",
    "deadlineStatus": "passed"
}];



const SearchBar = () => {
    const [options, setOptions] = useState([]);
    const { state } = useContext(AuthContext);
    const navigate = useNavigate();

    const renderItem = (record) => ({
        value: record.title,
        label: (
            <div className='auto-complete-item' onClick={() => navigate(`/user/ticket/${record.id}`)}>
                <h4>{record.title}</h4>
                <span>{sliceText(record.description)}</span>
            </div>
        ),
    });
    const selectedOptions = [
        {
            label: renderTitle('تیکت‌ها با بیشترین تطابق'),
            options: items.map(item => renderItem(item)),
        },
    ];

    const handleChange = async (e) => {
        const searchInput = e.target.value;
        if (searchInput === "") {
            setOptions([]);
        } else {
            // const data = {
            //     text: searchInput
            // }
            // const headers = { "x-access-token": state.token }
            // const response = await axios.get(
            //     `${config.baseUrl}/api/v1/search`,
            //     { headers: headers, params: data },
            // );
            // const options = [{
            //     label: renderTitle('تیکت‌ها با بیشترین تطابق'),
            //     options: response.data.tickets.map(item => renderItem(item)),
            // }];

            // setOptions(options);

            setOptions(selectedOptions);
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