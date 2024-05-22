import { useState } from 'react'

type SearchBoxProps = {
  handleSubmit: (arg0: string) => void
}

export const SearchBox = ({ handleSubmit }: SearchBoxProps) => {
  const [value, setValue] = useState('')

  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSubmit(value)
  }

  return (
    <form className="w-full max-w-lg px-4" onSubmit={formSubmit}>
      <div className="flex items-stretch gap-2 py-2">
        <input
          className="block w-full appearance-none rounded border bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
          type="text"
          placeholder="Bergen, Norway"
          aria-label="Location"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="flex-shrink-0 rounded border-4 border-teal-500 bg-teal-500 px-2 py-1 text-sm text-white hover:border-teal-700 hover:bg-teal-700"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  )
}
