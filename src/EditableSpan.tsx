import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
   title: string
   changeTitle: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
   const [editMode, setEditMode] = useState<boolean>(false)
   const [title, setTitle] = useState<string>(props.title)

   const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
   }
   const onEditMode = () => setEditMode(true)
   const offEditMode = () => {
      setEditMode(false)
      props.changeTitle(title)
   }

   return (
     editMode ? <input
         type="text"
         value={title}
         onChange={onChangeSetTitle}
         autoFocus={true}
         onBlur={offEditMode}
       /> :
       <span onDoubleClick={onEditMode}>{props.title}</span>
   )
}