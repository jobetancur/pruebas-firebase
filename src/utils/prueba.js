// Crear y exportar un arreglo con multiples realEstates
export const realEstates = [
    { 
        id: 1,
        title: "Casa en la playa",
        description: "Hermosa casa en la playa con vista al mar.",
        price: 200000,
        location: "Playa del Carmen, Quintana Roo",
        images: [
            "https://images.unsplash.com/photo-1573164713987-9f8b7c4b7f7b",
            "https://images.unsplash.com/photo-1573164713987-9f8b7c4b7f7b",
            "https://images.unsplash.com/photo-1573164713987-9f8b7c4b7f7b",
        ],
    },
    { 
        id: 2,
        title: "Departamento en la ciudad",
        description: "Departamento en la ciudad con vista a la torre latinoamericana.",
        price: 150000,
        location: "Ciudad de México",
        images: [
            "https://images.unsplash.com/photo-1573164713987-9f8b7c4b7f7b",
            "https://images.unsplash.com/photo-1573164713987-9f8b7c4b7f7b",
            "https://images.unsplash.com/photo-1573164713987-9f8b7c4b7f7b",
        ],
    },
    { 
        id: 3,
        title: "Casa en la montaña",
        description: "Casa en la montaña con vista a la ciudad.",
        price: 180000,
        location: "Monterrey, Nuevo León",
        images: [
            "https://images.unsplash.com/photo-1573164713987-9f8b7c4b7f7b",
            "https://images.unsplash.com/photo-1573164713987-9f8b7c4b7f7b",
            "https://images.unsplash.com/photo-1573164713987-9f8b7c4b7f7b",
        ],
    },
    { 
        id: 4,
        title: "Casa en la playa",
        description: "Hermosa casa en la playa con vista al mar.",
        price: 200000,
        location: "Playa del Carmen, Quintana Roo",
        images: [
            "https://images.unsplash.com/photo-1573164713987-9f8b7c4b7f7b",
            "https://images.unsplash.com/photo-1573164713987-9f8b7c4b7f7b",
            "https://images.unsplash.com/photo-1573164713987-9f8b7c4b7f7b",
        ],
    },
];

function filterProperties(realEstates, filters) {
    return realEstates.filter(property => {
        let matches = true;
        
        if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
            matches = matches && property.price >= filters.minPrice && property.price <= filters.maxPrice;
        }

        if (filters.location) {
            matches = matches && property.location.toLowerCase().includes(filters.location.toLowerCase());
        }

        if (filters.title) {
            matches = matches && property.title.toLowerCase().includes(filters.title.toLowerCase());
        }

        return matches;
    });
}

// Ejemplo de uso:
const filters = {
    minPrice: 0,
    maxPrice: 15000000,
    offer: "arriendo",
    type: "apartamento",
    city: "bogota",
    sector: "chico norte",
    bedrooms: 3,
    bathrooms: 1,
    garage: true,
    age: 10,
    condition: "usado",
};

const filteredProperties = filterProperties(realEstates, filters);
console.log(filteredProperties);