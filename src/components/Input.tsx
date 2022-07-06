import React, {ChangeEvent, KeyboardEvent} from 'react';

type inputPropsType = {
   setTitle: (title: string) => void
   title: string
}

export function Input(props: inputPropsType) {

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.setTitle(e.currentTarget.value)
   }

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.charCode === 13) {
         // addTask();
      }
   }

   return (
     <input
       value={props.title}
       onChange={onChangeHandler}
       onKeyPress={onKeyPressHandler}
     />
   )
}