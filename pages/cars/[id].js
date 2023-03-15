import { useRouter } from "next/router";
import Head from "next/head";

export default function Car({ car }) {
    const router = useRouter()
    const { id } = router.query
    return (<>
        <Head>
            <title>{car.color} {car.id}</title>
        </Head>
        <h1>Hello {id}</h1>
        <img height={400} src={car.image}/>
    </>)
}

// export async function getServerSideProps({ params }) {
//     const req = await fetch(`http://localhost:3000/${params.id}.json`)
//     const data = await req.json()
//     return {
//         props: { car: data },
//     }
// }


export const getStaticPaths = async () => {
    const req = await fetch(`http://localhost:3000/cars.json`)
    const data = await req.json()
    const paths = data.map(car => {
        return { params: { id: car } }
    })

    return {
        paths, //indicates that no page needs be created at build time
        fallback: false //indicates the type of fallback
    }
}

export async function getStaticProps({ params }) {
    const req = await fetch(`http://localhost:3000/${params.id}.json`)
    const data = await req.json()
    return {
        props: { car: data },
    }
}