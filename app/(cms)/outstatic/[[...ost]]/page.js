import 'outstatic/outstatic.css'
import { Outstatic } from 'outstatic'
import dynamic from 'next/dynamic'

const DynamicOstClient = dynamic(
    () => import('outstatic/client').then(mod => mod.OstClient),
    { ssr: false }
)

export default async function Page(props) {
    const params = await props.params
    const ostData = await Outstatic()
    return <DynamicOstClient ostData={ostData} params={params} />
}
