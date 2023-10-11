import useSWR from "swr";

export function Dog() {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data, error, isLoading } = useSWR('https://api.thedogapi.com/v1/images/search', fetcher);

    console.log(data);
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    return <>
        <img src={data[0].url}/>
        <button onClick={()=>window.location.reload()} type="button">New Doggo</button>
    </>
}