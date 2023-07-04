import CreatePanel from './(components)/CreatePanel';
import DynamicWall from './(components)/DynamicWall';

export default async function page()
{
    return (
        <>
            <DynamicWall/>
            <CreatePanel />
        </>
    );
}

