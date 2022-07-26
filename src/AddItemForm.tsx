import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type addItemFormPropsTpe = {
   addItem: (title: string) => void
}

export function AddItemForm(props: addItemFormPropsTpe) {
   const errorMessageStyles = {color: "hotpink"}
   const [title, setTitle] = useState("")
   const [error, setError] = useState<boolean>(false)


   const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
      error && setError(false)
      setTitle(e.currentTarget.value)
   }

   const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && e.ctrlKey) {
         onClickAddItem()
      }
   }
   const onClickAddItem = () => {
      const trimmedTitle = title.trim()
      if (trimmedTitle) {
         props.addItem(trimmedTitle)
      } else {
         setError(true)
      }
      setTitle("")
   }

   return (
     <div>
        <input
          value={title}
          onChange={onChangeSetTitle}
          onKeyDown={onKeyDownAddItem}
          className={error ? "error" : ""}
        />
        <button onClick={onClickAddItem}>+</button>
        {error && <div style={errorMessageStyles}>Title is required!</div>}
     </div>
   )
}