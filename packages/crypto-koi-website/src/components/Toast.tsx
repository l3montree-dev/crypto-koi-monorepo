import React, { FunctionComponent } from 'react'

const Toast: FunctionComponent<{ msg: string }> = (props) => {
  return (
    <div className="flex flex-row justify-center">
      <div className="bg-slate-100 py-2 px-3 rounded-full">{props.msg}</div>
    </div>
  )
}

export default Toast
