import React, { useEffect, useState } from 'react';
import { getAllListings } from '../api/listings';
import type { ListingResponseDTO } from '../types/api';


export default function ListingsList() {
const [listings, setListings] = useState<ListingResponseDTO[]>([]);


useEffect(() => {
getAllListings().then(setListings).catch(console.error);
}, []);
console.log(listings)

return (
<div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
{listings.map((l) => (
<div key={l.id} className="card">
<h3 className="font-semibold">{l.title}</h3>
<p className="text-sm">{l.description}</p>
</div>
))}
</div>
);
}