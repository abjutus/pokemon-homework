import { currentTypeUrlAtom } from '@/store'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

export default function Filter() {
	const typeUrl = 'https://pokeapi.co/api/v2/type'

	const { isPending, error, data } = useQuery({
		queryKey: ['pokemon-type'],
		queryFn: () => fetch(typeUrl).then((res) => res.json()),
	})

	if (isPending) return <p>Loading...</p>

	if (error) return <p>Error: {error.message}</p>

	return (
		<section className="my-10">
			<ul className="grid grid-cols-3 gap-3 md:grid-cols-6">
				{data?.results.map(({ name, url }: { name: string; url: string }) => (
					<li key={name} className="border-2">
						<FilterItem name={name} url={url} />
					</li>
				))}
			</ul>
		</section>
	)
}

function FilterItem({ name, url }: { name: string; url: string }) {
	const [_currentTypeUrl, setCurrentTypeUrl] = useAtom(currentTypeUrlAtom)

	return (
		<button
			className="w-full rounded-md bg-black px-4 py-2 text-white"
			onClick={() => setCurrentTypeUrl(url)}
		>
			{name}
		</button>
	)
}
