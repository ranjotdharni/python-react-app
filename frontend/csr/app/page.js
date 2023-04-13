export default function HomePage({data})
{
    return (
        <div>
            <h1>Welcome to the home page!</h1>
            <p>data.message</p>
        </div>
    );
}

export async function getServerSideProps()
{
    const res = await fetch('https://meteorize-backend.onrender.com/v1', {
      method: "GET",
      headers: {
        "AUTH-TOKEN": process.env.AUTH_TOKEN,
      }
    });
    const data = await res.json();
    return {props: {data}}
}