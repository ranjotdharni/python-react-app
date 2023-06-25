import CurrentWidget from './(widgets)/CurrentWidget';
import DailyWidget from './(widgets)/DailyWidget';
import WeeklyWidget from './(widgets)/WeeklyWidget';

export default async function page({searchParams})
{
  const id = searchParams.id;
  if (!id)
  {
    newError(`Hmm, that page doesn't seem to exist...`)
  }

  return (
    <>
      <CurrentWidget props={id}/>
      <DailyWidget props={id}/>
      <WeeklyWidget props={id}/>
    </>
  );
}

const newError = (m) => {
  throw new Error(m);
}