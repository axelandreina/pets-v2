const fetchBreedList = async ({ queryKey }) => {
  const animal = queryKey[1];

  if (!animal) return [];

  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );

  //React query needs us to throw an error if we don't have a response

  if (!apiRes.ok) {
    throw new Error(`breeds/${animal} fetch not ok`);
  }

  //React query expect us to return a promise
  return apiRes.json();
};

export default fetchBreedList;
