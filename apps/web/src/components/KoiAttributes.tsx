import { ClientCryptogotchi } from '@crypto-koi/common/lib/graphql/queries/__generated__/ClientCryptogotchi'
import { FunctionComponent } from 'react'

export const Attributes: FunctionComponent<ClientCryptogotchi['attributes']> = (
    props
) => {
    return (
        <div className="flex flex-wrap flex-row">
            {Object.entries(props)
                .filter(([_, value]) => {
                    return typeof value === 'string' && value.startsWith('#')
                })
                .map(([attr, value]) => (
                    <div
                        key={attr}
                        className="bg-white mr-2 mb-2 rounded-lg p-3 flex flex-col items-center justify-center"
                    >
                        <div
                            className="w-10 h-10 border-2 rounded-lg"
                            style={{
                                backgroundColor: value,
                            }}
                        />
                        <span className="mt-2">{value}</span>
                    </div>
                ))}
            <div className="bg-white rounded-lg p-3 mb-2 flex flex-col items-center justify-center">
                <div className="w-10 flex-row flex items-center justify-center font-bold h-10 border-2 rounded-lg">
                    {props.patternQuantity}
                </div>
                <span className="mt-2">Patterns</span>
            </div>
        </div>
    )
}
