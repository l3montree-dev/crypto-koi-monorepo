import React, { FunctionComponent, ReactNode } from 'react'

interface Props {
    onClick: () => void
    loading: boolean
    progress: number
    children: ReactNode
    disabled?: boolean
}
const ProgressButton: FunctionComponent<Props> = (props) => {
    return (
        <div
            tabIndex={0}
            onClick={!props.disabled ? props.onClick : undefined}
            className={
                props.disabled
                    ? 'opacity-50 progress-button rounded-lg'
                    : ' progress-button rounded-lg'
            }
        >
            <div className="bg-gray-400 transition hover:bg-slate-500 cursor-pointer pointer overflow-hidden relative h-12 flex-row flex items-center justify-center rounded-lg">
                <div
                    style={{ width: props.progress * 100 + '%' }}
                    className="progress absolute left-0 h-18 bg-cherry h-full"
                ></div>
                <span className="text-white font-bold relative z-2">
                    {props.children}
                </span>
            </div>
        </div>
    )
}

export default ProgressButton
