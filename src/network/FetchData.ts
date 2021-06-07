const requests = new Set();
const fetchData = async (
  query: string = '',
  pageIndex: number = 0,
  perPage: number = 20,
) => {
  const url = `https://api.pexels.com/v1/search?query=${query}&page=${pageIndex}&per_page=${perPage}`;
  try {
    if (requests.has(url)) {
      return;
    }
    requests.add(url);
    console.log(`fetch from: ${url}`);
    const response = await fetch(url, {
      headers: {
        Authorization:
          '563492ad6f91700001000001414a159eaed14a5594dff71a233e1bd7',
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  } finally {
    requests.delete(url);
  }
};
export default fetchData;
