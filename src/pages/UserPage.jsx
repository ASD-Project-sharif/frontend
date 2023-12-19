import { useContext } from "react";
import { AuthContext } from "../App";

const UserPage = () => {
    const { state } = useContext(AuthContext);
    return (
        <div>
            {state.user}
        </div>
    )
}

export default UserPage;