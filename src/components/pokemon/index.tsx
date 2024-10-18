import { currentTypeUrlAtom } from '@/store'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

export default function Pokemon() {
	const [currentTypeUrl, _] = useAtom(currentTypeUrlAtom)

	const { isPending, error, isError, data } = useQuery({
		queryKey: ['pokemon', currentTypeUrl],
		queryFn: () => fetch(currentTypeUrl).then((res) => res.json()),
	})

	if (currentTypeUrl === '') return <p>Choose a type</p>

	if (isError) return <p>Error: {error?.message}</p>

	if (isPending) return <p>Loading Pokemon Items...</p>

	return (
		<section>
			<ul className="grid grid-cols-3 gap-3 md:grid-cols-6">
				{data?.pokemon.map(
					({
						pokemon: { name, url },
					}: {
						pokemon: {
							name: string
							url: string
						}
					}) => (
						<li key={name}>
							<PokemonItem name={name} url={url} />
						</li>
					),
				)}
			</ul>
		</section>
	)
}

function PokemonItem({ name, url }: { name: string; url: string }) {
	const { isPending, error, data } = useQuery({
		queryKey: ['pokemon-item', url],
		queryFn: () => fetch(url).then((res) => res.json()),
	})

	if (isPending) return <p>Loading Pokemon Items...</p>

	if (error) return <p>Error: {error.message}</p>

	return (
		<div className="flex flex-col rounded-md border-2 border-black p-4">
			<span className="font-mono text-xl font-bold">
				{url.slice(0, -1).split('/').pop()?.padStart(4, '0')}
			</span>
			<h3 className="my-2 text-xl font-semibold uppercase tracking-widest">{name}</h3>
			<img src={data.sprites.other['official-artwork'].front_default} alt={name} />
			<ul className="flex items-center gap-3">
				{data.types.map(({ type }: { type: { name: string } }) => (
					<li
						key={type.name}
						className="flex items-center rounded-full bg-slate-300 px-3 py-1 text-sm"
					>
						{type.name}
					</li>
				))}
			</ul>
		</div>
	)
}
