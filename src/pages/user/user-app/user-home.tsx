import EstablishmentCard from '@/components/establishment-card'

export function UserHome() {
	return (
		<>
			<EstablishmentCard
				name='Café Central Dos Andrades De Lima'
				address='Rua Principal, 123'
				distance='2.5 km'
				rating={4.5}
				imageUrl='https://via.placeholder.com/100x100'
			/>
			<EstablishmentCard
				name='Restaurante Bela Vista'
				address='Avenida do Parque, 456'
				distance='3.8 km'
				rating={4.8}
				imageUrl='https://via.placeholder.com/384x200'
			/>
			<EstablishmentCard
				name='Padaria Doce Sabor'
				address='Travessa da Alegria, 789'
				rating={4.9}
				distance='1.2 km'
				imageUrl='https://via.placeholder.com/384x200'
			/>
		</>
	)
}
