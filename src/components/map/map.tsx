import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { MapPin } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import type { MarkerDragEvent } from 'react-map-gl'
import Mapa, { Marker, NavigationControl } from 'react-map-gl'

const TOKEN =
  'pk.eyJ1Ijoic2lybHVjYXNsaW1hIiwiYSI6ImNsd2F2bjQyZzBpcWgycXJ6Z2Jqbjd2OXkifQ.Up9yS3aS6Q5lnoZChs3gBw'
// const MAP_STYLE = 'mapbox://styles/mapbox/dark-v9'
const MAP_STYLE = 'mapbox://styles/mapbox/standard'

type InitialViewStatProps = {
  latitude: number
  longitude: number
  zoom: number
}
type MarkerProps = {
  latitude: number
  longitude: number
}

export function Map() {
  const [initialViewState, setInitialViewState] =
    useState<InitialViewStatProps>()
  const [marker, setMarker] = useState<MarkerProps | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  // const [events, logEvents] = useState<Record<string, LngLat>>({})

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      setInitialViewState({
        latitude,
        longitude,
        zoom: 12,
      })
      setMarker({
        latitude,
        longitude,
      })
      setIsLoading(false)
    })
  }, [])

  // const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
  //   logEvents(
  //     (_events) =>
  //       ({ ..._events, onDragStart: event.lngLat }) as unknown as Record<
  //         string,
  //         LngLat
  //       >,
  //   )
  // }, [])

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    // logEvents(
    //   (_events) =>
    //     ({ ..._events, onDragStart: event.lngLat }) as unknown as Record<
    //       string,
    //       LngLat
    //     >,
    // )

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    })
  }, [])

  // const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
  //   logEvents(
  //     (_events) =>
  //       ({ ..._events, onDragStart: event.lngLat }) as unknown as Record<
  //         string,
  //         LngLat
  //       >,
  //   )
  // }, [])

  return (
    <AspectRatio ratio={1} className="rounded">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Mapa
          initialViewState={initialViewState}
          mapStyle={MAP_STYLE}
          style={{ width: '100%', borderRadius: '8px' }}
          mapboxAccessToken={TOKEN}
        >
          {!marker ? (
            <div>Loading map...</div>
          ) : (
            <Marker
              longitude={marker.longitude}
              latitude={marker.latitude}
              anchor="bottom"
              draggable
              // onDragStart={onMarkerDragStart}
              onDrag={onMarkerDrag}
              // onDragEnd={onMarkerDragEnd}
            >
              <MapPin size={20} className="text-red-700" />
            </Marker>
          )}

          <NavigationControl />
        </Mapa>
      )}
    </AspectRatio>
  )
}
