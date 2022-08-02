import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, Input, TextField} from "@material-ui/core";
import {AddToPhotosSharp} from "@material-ui/icons";

type AddItemFormPropsType = {
   addItem: (title: string) => void
}

const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
   const [title, setTitle] = useState("")
   const [error, setError] = useState<boolean>(false)


   const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
      error && setError(false)
      setTitle(e.currentTarget.value)
   }
   const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && e.ctrlKey === true) {
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

   const errorMessageStyles = {color: "hotpink"}

   return (
     <div>
        <TextField
          variant={"outlined"}
          size={"small"}
          value={title}
          onChange={onChangeSetTitle}
          onKeyDown={onKeyDownAddItem}
          className={error ? "error" : ""}
          label={"Title"}
          error={error}
          helperText={error && "Title is required"}
        />

        {/*<input*/}
        {/*  value={title}*/}
        {/*  onChange={onChangeSetTitle}*/}
        {/*  onKeyDown={onKeyDownAddItem}*/}
        {/*  className={error ? "error" : ""}*/}
        {/*/>*/}

        <Button onClick={onClickAddItem}>
           <AddToPhotosSharp color={"action"}/>
        </Button>
        {/*{error && <div style={errorMessageStyles}>Title is required!</div>}*/}
     </div>
   );
};

export default AddItemForm;