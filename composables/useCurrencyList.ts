export default async (search:globalThis.Ref<string>) => {
    const list = await useAsyncData(`list-${search?.value}`,() => $fetch(`/api/list?search=${search?.value ?? ""}`),{
        watch:[search]
    })
    return list
}