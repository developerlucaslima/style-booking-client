import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { MapPin } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import type { MarkerDragEvent } from 'react-map-gl'
import Mapa, { Marker, NavigationControl } from 'react-map-gl'

const TOKEN =
  'pk.eyJ1Ijoic2lybHVjYXNsaW1hIiwiYSI6ImNsd2F2bjQyZzBpcWgycXJ6Z2Jqbjd2OXkifQ.Up9yS3aS6Q5lnoZChs3gBw'
const MAP_STYLE = 'mapbox://styles/mapbox/standard'
const DEFAULT_ZOOM = 12
type MarkerProps = {
  latitude: number
  longitude: number
}

export function Map() {
  const [marker, setMarker] = useState<MarkerProps>()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords

      setMarker({
        latitude,
        longitude,
      })
    })
  }, [])

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    })
  }, [])

  return (
    <AspectRatio ratio={1} className="rounded">
      {!marker ? (
        <div>Loading...</div>
      ) : (
        <Mapa
          initialViewState={{
            latitude: marker.latitude,
            longitude: marker.longitude,
            zoom: DEFAULT_ZOOM,
          }}
          mapStyle={MAP_STYLE}
          mapboxAccessToken={TOKEN}
          style={{ width: '100%', borderRadius: '8px', overflow: 'hidden' }}
        >
          <div>Loading map...</div>
          <Marker
            longitude={marker.longitude}
            latitude={marker.latitude}
            anchor="bottom"
            draggable
            onDrag={onMarkerDrag}
          >
            <MapPin size={20} className="fill-red-500 text-red-700" />
          </Marker>
          <NavigationControl />
        </Mapa>
      )}
    </AspectRatio>
  )
}
