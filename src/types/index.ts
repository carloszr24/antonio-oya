export interface Property {
  id: string
  title: string
  price: number
  location: string
  type: string
  operation?: string
  status: string
  description: string
  images: string
  fotocasaUrl?: string | null
  bedrooms?: number | null
  bathrooms?: number | null
  sqMeters?: number | null
  availability?: string | null
  hotWater?: string | null
  heating?: string | null
  condition?: string | null
  propertyAge?: string | null
  floor?: string | null
  garage?: string | null
  elevator?: string | null
  furnished?: string | null
  energyRating?: string | null
  energyValue?: number | null
  emissionsRating?: string | null
  emissionsValue?: number | null
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface PropertyFilters {
  type?: string
  operation?: string
  status?: string
  minPrice?: number
  maxPrice?: number
}

export interface PropertyFormData {
  title: string
  price: string
  location: string
  type: string
  operation: string
  status: string
  description: string
  images: string
  fotocasaUrl: string
  bedrooms: string
  bathrooms: string
  sqMeters: string
  availability: string
  hotWater: string
  heating: string
  condition: string
  propertyAge: string
  floor: string
  garage: string
  elevator: string
  furnished: string
  energyRating: string
  energyValue: string
  emissionsRating: string
  emissionsValue: string
  featured: boolean
}
