import { theme } from "antd";
import { Header } from "antd/es/layout/layout"
import { useState } from "react";
import Filter from "../components/filter";
import TicketTable from "../components/ticketTable";

const PassedDeadlinePage = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [filter, setFilter] = useState({});
    return (
        <div>
            <Header style={{ background: colorBgContainer }} className="panel-header">
                <h3>
                    تیکت‌های ددلاین رد شده
                </h3>
                <Filter setFilterValues={setFilter} />
            </Header>
            <TicketTable filter={filter} deadlineStatus="passed" />
        </div>
    )
}

export default PassedDeadlinePage;