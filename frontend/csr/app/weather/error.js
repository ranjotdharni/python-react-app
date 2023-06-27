'use client'
 
export default function Error({ error, reset }) {
  return (
    <div>
      This is the error page.
      <h2>{error.message}</h2>
    </div>
  )
}