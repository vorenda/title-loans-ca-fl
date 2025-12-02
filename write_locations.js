import { getPayload } from 'payload'
import config from './payload.config.ts'

// Ensure env vars are set
if (!process.env.PAYLOAD_SECRET) {
  process.env.PAYLOAD_SECRET = 'super-secret-key-change-in-production'
}
if (!process.env.DATABASE_URI) {
  process.env.DATABASE_URI = 'postgresql://postgres:password@localhost:5433/title_loans_db'
}

const citiesData = [
  {
    name: "Miami",
    state: "Florida",
    stateCode: "FL",
    county: "Miami-Dade County",
    slug: "miami-fl",
    areaCode: "305",
    population: 442241,
    coordinates: { latitude: 25.7617, longitude: -80.1918 },
    localFacts: {
      landmarks: ["South Beach", "Wynwood Art District", "Vizcaya Museum and Gardens"],
      highways: ["I-95", "I-395", "US-1 (Biscayne Boulevard)"],
      exits: ["I-95 Exit 20 - Brickell", "I-395 Exit 1 - Downtown Miami"],
      neighboringCities: ["Miami Beach", "Hialeah", "Coral Gables", "North Miami"]
    }
  },
  {
    name: "Jacksonville",
    state: "Florida",
    stateCode: "FL",
    county: "Duval County",
    slug: "jacksonville-fl",
    areaCode: "904",
    population: 949611,
    coordinates: { latitude: 30.3322, longitude: -81.6557 },
    localFacts: {
      landmarks: ["St. Johns River", "TIAA Bank Field", "Riverside Historic District"],
      highways: ["I-95", "I-10", "US-1"],
      exits: ["I-95 Exit 353 - Downtown Jacksonville", "I-10 Exit 339 - San Marco"],
      neighboringCities: ["Jacksonville Beach", "Arlington", "Atlantic Beach", "Neptune Beach"]
    }
  },
  {
    name: "Tampa",
    state: "Florida",
    stateCode: "FL",
    county: "Hillsborough County",
    slug: "tampa-fl",
    areaCode: "813",
    population: 399700,
    coordinates: { latitude: 27.9506, longitude: -82.4580 },
    localFacts: {
      landmarks: ["Ybor City", "Tampa Bay Buccaneers Stadium (Raymond James)", "Busch Gardens Tampa"],
      highways: ["I-75", "I-4", "US-19"],
      exits: ["I-75 Exit 258 - Downtown Tampa", "I-4 Exit 25B - Ybor City"],
      neighboringCities: ["St. Petersburg", "Clearwater", "Temple Terrace", "Brandon"]
    }
  },
  {
    name: "Orlando",
    state: "Florida",
    stateCode: "FL",
    county: "Orange County",
    slug: "orlando-fl",
    areaCode: "407",
    population: 307573,
    coordinates: { latitude: 28.5421, longitude: -81.3723 },
    localFacts: {
      landmarks: ["Walt Disney World", "Universal Orlando", "Lake Eustis"],
      highways: ["I-4", "US-17", "US-92"],
      exits: ["I-4 Exit 75A - Downtown Orlando", "I-4 Exit 62 - Universal Boulevard"],
      neighboringCities: ["Kissimmee", "Winter Park", "Maitland", "Altamonte Springs"]
    }
  },
  {
    name: "St. Petersburg",
    state: "Florida",
    stateCode: "FL",
    county: "Pinellas County",
    slug: "st-petersburg-fl",
    areaCode: "727",
    population: 265351,
    coordinates: { latitude: 27.7691, longitude: -82.6408 },
    localFacts: {
      landmarks: ["Salvador Dali Museum", "St. Pete Beach", "Mahaffey Theater"],
      highways: ["I-275", "US-19", "US-92"],
      exits: ["I-275 Exit 31 - Downtown St. Petersburg", "US-19 Exit - Central Avenue"],
      neighboringCities: ["Tampa", "Clearwater", "Largo", "Gulfport"]
    }
  },
  {
    name: "Hialeah",
    state: "Florida",
    stateCode: "FL",
    county: "Miami-Dade County",
    slug: "hialeah-fl",
    areaCode: "305",
    population: 233339,
    coordinates: { latitude: 25.8575, longitude: -80.2781 },
    localFacts: {
      landmarks: ["Hialeah Park Racing Casino", "Amelia Earhart Park", "Buena Vista East"],
      highways: ["I-95", "Florida's Turnpike", "US-27"],
      exits: ["I-95 Exit 77 - Hialeah Gardens", "Turnpike Exit 37 - Okeechobee Road"],
      neighboringCities: ["Miami", "Miami Lakes", "Medley", "Doral"]
    }
  },
  {
    name: "Fort Lauderdale",
    state: "Florida",
    stateCode: "FL",
    county: "Broward County",
    slug: "fort-lauderdale-fl",
    areaCode: "954",
    population: 182760,
    coordinates: { latitude: 26.1223, longitude: -80.1434 },
    localFacts: {
      landmarks: ["Las Olas Boulevard", "Fort Lauderdale Beach", "Stranahan House"],
      highways: ["I-95", "Florida's Turnpike", "US-1"],
      exits: ["I-95 Exit 31 - Las Olas Boulevard", "I-95 Exit 32 - Broward Boulevard"],
      neighboringCities: ["Deerfield Beach", "Pompano Beach", "Oakland Park", "Lauderdale-by-the-Sea"]
    }
  },
  {
    name: "Tallahassee",
    state: "Florida",
    stateCode: "FL",
    county: "Leon County",
    slug: "tallahassee-fl",
    areaCode: "850",
    population: 196169,
    coordinates: { latitude: 30.4383, longitude: -84.2807 },
    localFacts: {
      landmarks: ["Florida State Capitol", "Cascades Park", "Lake Jackson"],
      highways: ["I-10", "US-27", "US-319"],
      exits: ["I-10 Exit 199 - Tallahassee", "US-27 Exit - Governor's Square"],
      neighboringCities: ["Monticello", "Havana", "Crawfordville", "Wakulla"]
    }
  },
  {
    name: "Cape Coral",
    state: "Florida",
    stateCode: "FL",
    county: "Lee County",
    slug: "cape-coral-fl",
    areaCode: "239",
    population: 194928,
    coordinates: { latitude: 26.5628, longitude: -81.9496 },
    localFacts: {
      landmarks: ["Cape Coral Beach Park", "Caloosahatchee River", "Four Mile Cove Ecological Preserve"],
      highways: ["I-75", "US-41", "Cape Coral Parkway"],
      exits: ["I-75 Exit 131 - Cape Coral", "US-41 Exit - Pelican Boulevard"],
      neighboringCities: ["Fort Myers", "Lehigh Acres", "Estero", "Bonita Springs"]
    }
  },
  {
    name: "Pembroke Pines",
    state: "Florida",
    stateCode: "FL",
    county: "Broward County",
    slug: "pembroke-pines-fl",
    areaCode: "954",
    population: 176432,
    coordinates: { latitude: 26.0154, longitude: -80.3224 },
    localFacts: {
      landmarks: ["Pembroke Gardens", "C.B. Smith Park", "Pembroke Pines Nature Trail"],
      highways: ["I-75", "Florida's Turnpike", "Pembroke Road (FL-816)"],
      exits: ["I-75 Exit 23 - Pembroke Road", "Turnpike Exit 41 - Pembroke Road"],
      neighboringCities: ["Miramar", "Hollywood", "Weston", "Fort Lauderdale"]
    }
  }
]

async function writeLocations() {
  try {
    const payload = await getPayload({ config })
    
    console.log('Starting to write locations to CMS...')
    console.log('==================================')
    
    const createdIds = []
    let success = 0
    let failed = 0
    
    for (const cityData of citiesData) {
      try {
        console.log(`\nWriting: ${cityData.name}...`)
        
        const result = await payload.create({
          collection: 'locations',
          data: cityData,
        })
        
        console.log(`✓ Success - ID: ${result.id}`)
        createdIds.push({ name: cityData.name, id: result.id })
        success++
      } catch (error) {
        console.error(`✗ Failed - Error: ${error.message}`)
        failed++
      }
    }
    
    console.log('\n==================================')
    console.log('CMS WRITE SUMMARY')
    console.log('==================================')
    console.log(`Total locations: ${citiesData.length}`)
    console.log(`Successful: ${success}`)
    console.log(`Failed: ${failed}`)
    
    if (createdIds.length > 0) {
      console.log('\nCREATED LOCATIONS:')
      createdIds.forEach(({ name, id }) => {
        console.log(`  - ${name}: ${id}`)
      })
    }
    
    console.log('\nVerify in CMS: http://localhost:3000/admin/collections/locations')
    process.exit(0)
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

writeLocations()
