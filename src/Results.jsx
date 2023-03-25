import Pet from "./Pet"

const Results = ({ pets }) => {
    return (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
            {
                !pets.length ? (
                    <h1>No pets found</h1>
                ) : (pets.map((pet) => (
                    <Pet id={pet.id} name={pet.name} animal={pet.animal} breed={pet.breed} key={pet.id} images={pet.images} location={`${pet.city}, ${pet.state}`} />
                )
                ))
            }
        </div>

    )
}

export default Results;

