import Card from "antd/es/card/Card";
import NavBar from "../components/navBar";


const TicketSubmitted = () => {
    return (
        <div>
            <div>
                <div className="site-header-bg"></div>
                <NavBar />
            </div>
            <Card className="card">
                <p>تیکت شما با موفقیت ثبت شد.</p>
            </Card>
        </div>
    )
}

export default TicketSubmitted;