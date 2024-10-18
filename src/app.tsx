import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Filter from './components/filter'
import Pokemon from './components/pokemon'

const queryClient = new QueryClient()

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<main className="container mx-auto my-10 px-6 md:px-0">
				<h1 className="my-10 text-3xl font-bold">Pokemon Homework</h1>
				<div>
					<Filter />
					<Pokemon />
				</div>
			</main>
		</QueryClientProvider>
	)
}
