import { Button } from "antd";

const UpdateProduct = ({ product, setDrawerVisibility }) => {
    const showModal = () => { }
    return (
        <>
            <Button onClick={showModal} size="small" type="primary" ghost>
                ویرایش
            </Button>
        </>
    )
}

export default UpdateProduct;