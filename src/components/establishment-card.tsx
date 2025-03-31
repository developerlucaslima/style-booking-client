import { Heart, MapPin, Star } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@radix-ui/react-select'

interface EstablishmentCardProps {
	name: string
	address: string
	distance: string
	rating?: number
	imageUrl: string
}

export default function EstablishmentCard({
	name,
	address,
	distance,
	rating,
	imageUrl,
}: EstablishmentCardProps) {
	return (
		<Card className='flex max-w-sm items-center overflow-hidden'>
			<img
				src={imageUrl}
				alt={`Imagem de ${name}`}
				className='h-auto w-32 flex-shrink-0 object-cover'
			/>

			<div className='flex w-full flex-col p-4'>
				<h3 className='max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-lg'>
					{name}
				</h3>

				<p className='max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground text-sm'>
					{address}
				</p>

				<Separator aria-orientation='horizontal' className='h-6' />

				<div className='mb-[-12px] flex w-full max-w-[220px] items-center justify-between'>
					<div className='flex gap-4 overflow-hidden'>
						<div className='flex flex-shrink-0 items-center'>
							<MapPin className='mr-1 h-4 w-4 flex-shrink-0' />
							<p className='overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground text-sm'>
								{distance}
							</p>
						</div>

						{rating != null && rating > 0 && (
							<div className='flex flex-shrink-0 items-center'>
								<Star className='mr-1 h-4 w-4 flex-shrink-0' />
								<p className='text-muted-foreground text-sm'>{rating.toFixed(1)}</p>
							</div>
						)}
					</div>

					<Button variant='ghost' size='icon' aria-label='Favoritar' className='ml-2 flex-shrink-0'>
						<Heart className='h-4 w-4' />
					</Button>
				</div>
			</div>
		</Card>
	)
}
