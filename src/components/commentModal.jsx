import { Input, Modal } from "antd"
import { useState } from "react";

const CommentModal = ({ title, open, setOpen, handleSubmit }) => {
    const [text, setText] = useState('');

    const handleCancel = () => {
        setOpen(false);
    };

    const handleOk = () => {
        setText('');
        handleSubmit(text);
    }


    return (
        <Modal title={title} open={open} onOk={handleOk} onCancel={handleCancel}>
            <Input.TextArea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                placeholder="متن پاسخ"
            />
        </Modal>
    )
}

export default CommentModal;