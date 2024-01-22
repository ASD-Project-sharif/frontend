import { theme } from "antd";
import { Header } from "antd/es/layout/layout";
import Filter from "../components/filter";
import { useState } from "react";
import TicketTable from "../components/ticketTable";
import SearchBar from "../components/searchBar";

const AllTicketsPage = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [filter, setFilter] = useState({});

    return (
        <div>
            <SearchBar />
            <Header style={{ background: colorBgContainer }} className="panel-header">
                <span>
                    همه تیکت‌ها
                </span>
                <Filter setFilterValues={setFilter} />
            </Header>
            <TicketTable filter={filter} deadlineStatus={undefined} />
        </div>
    )
}

export default AllTicketsPage;