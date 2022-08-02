import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
   title: string
   changeTitle: (newTitle: string) => void
}

const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
   const [editMode, setEditMode] = useState<boolean>(false)
   const [title, setTitle] = useState<string>(props.title)
   const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
   }
   const onEditMode = () => setEditMode(true)
   const offEditMode = () => {
      props.changeTitle(title)
      setEditMode(false)
   }
   return (
     editMode
       ?
       <TextField
         value={title}
         onChange={onChangeSetTitle}
         autoFocus
         onBlur={offEditMode}
       />
       // <input
       //   value={title}
       //   onChange={onChangeSetTitle}
       //   autoFocus
       //   onBlur={offEditMode}
       //   />
       : <span onDoubleClick={onEditMode}>{props.title}</span>
   );
};

export default EditableSpan;