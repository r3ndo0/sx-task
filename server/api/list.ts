import list from "../../currencies/list.json"



export default defineEventHandler(async(event) => {
      const query = getQuery(event)
    
        if(!query || !query.search) return list
        const specificC = list.filter(c => {
            return c.currency.toLocaleLowerCase().includes(query.search?.toLocaleString() as string)
        })
        return specificC
  })