import { Button } from '@chakra-ui/react'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useInView } from 'react-intersection-observer'
import { IGetYourKoiPB, IKoiMetadata } from '../cms/page'
import CMSContent from '../components/CMSContent'
import Koi from '../components/Koi'
import Section from '../components/Section'
import { config } from '../misc/config'

const fetchRandomKoi = async (): Promise<IKoiMetadata> => {
  const resp = await fetch(
    config.api +
      '/v1/fakes/' +
      Math.random().toString().substring(2, 8) +
      Math.random().toString().substring(2, 8)
  )
  return resp.json()
}
const GetYourKoi: FunctionComponent<IGetYourKoiPB> = (props) => {
  const [kois, setKois] = useState<
    Array<{
      image: string
      colors: string[]
      patterns: number
      species: string
    }>
  >([])

  const regenerate = useCallback(async () => {
    const amountOfKois = window.innerWidth > 992 ? 3 : 1
    const promises = []
    for (let i = 0; i < amountOfKois; i++) {
      promises.push(fetchRandomKoi())
    }
    const data = await Promise.all(promises)

    setKois(
      data.map((el) => ({
        species: (
          el.attributes.find((attr) => attr.trait_type === 'Species')?.value ??
          'Koi'
        ).toLocaleUpperCase(),
        colors: el.attributes
          .filter((attr) => {
            return typeof attr.value === 'string' && attr.value.startsWith('#')
          })
          .map((attr) => attr.value),
        patterns: +(
          el.attributes.find((attr) => attr.trait_type === 'Pattern Quantity')
            ?.value ?? 0
        ),

        image: el.image,
      }))
    )
  }, [])
  useEffect(() => {
    regenerate()
  }, [regenerate])
  return (
    <Section>
      <div className="p-4 max-w-screen-xl mx-auto">
        <h3 className="text-3xl mb-4 font-bold font-poppins">{props.Title}</h3>
        <CMSContent>{props.Text}</CMSContent>
        <div className="flex justify-around flex-row">
          {kois.map((k) => (
            <Koi
              species={k.species}
              colors={k.colors}
              patterns={k.patterns}
              key={k.image}
              src={k.image}
            />
          ))}
        </div>
        <div className="flex flex-row justify-center mt-5">
          <Button onClick={regenerate} colorScheme={'cherry'}>
            Show more
          </Button>
        </div>
      </div>
    </Section>
  )
}

export default GetYourKoi
