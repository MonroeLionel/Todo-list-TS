import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string)=> void
}

const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>)=> {
        setTitle(e.currentTarget.value)
    }
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        props.changeTitle(title)
        setEditMode(false)
    }
    return (
        editMode
        ? <input
            value={title}
            onChange={onChangeSetTitle}
            autoFocus
            onBlur={offEditMode}
            />
        : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

export default EditableSpan;