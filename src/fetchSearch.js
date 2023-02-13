async function fetchSearch({ queryKey }) {
  const { animal, breed, location } = queryKey[1];

  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&breed=${breed}&location=${location}`
  );

  if (!res.ok) {
    throw new Error(`pet search not ok ${animal}. ${breed}. ${location}`);
  }

  return res.json();
}

export default fetchSearch;
