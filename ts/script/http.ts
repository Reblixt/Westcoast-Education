export default class HttpClient {
  #url = "";

  constructor(url: string) {
    this.#url = url;
  }

  async get() {
    try {
      const response = await fetch(this.#url);

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      throw Error(` Ett fel har skett i get metoden: ${error}`);
    }
  }

  async add(data: any) {
    try {
      console.log(data);
      const response = await fetch(this.#url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`Ett fel har skett i add metoden: ${error}`);
    }
  }

  async delete() {
    try {
      const response = await fetch(this.#url, {
        method: "DELETE",
      });
    } catch (error) {
      throw new Error(`Ett fel inträffade i delete metoden: ${error}`);
    }
  }

  async update(data: string) {
    try {
      const response = await fetch(this.#url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`Ett fel inträffade i update metoden: ${error}`);
    }
  }
}
