import { theme } from "antd";
import { Header } from "antd/es/layout/layout";
import Filter from "../components/filter";
import { useState } from "react";
import TicketTable from "../components/ticketTable";

const AllTicketsPage = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [filter, setFilter] = useState({});

    return (
        <div>
            <Header style={{ background: colorBgContainer }} className="panel-header">
                <h3>
                    همه تیکت‌ها
                </h3>
                <Filter setFilterValues={setFilter} />
            </Header>
            <TicketTable filter={filter} deadlineStatus={undefined} />
        </div>
    )
}

export default AllTicketsPage;