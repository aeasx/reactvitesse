import { Button, DatePicker } from "antd"
import { Test } from "@/components/Test"

function App() {
  return (
    <div>
      <h1 className='text-2xl font-bold text-red-600'>react-ts-template</h1>
      <p>unknown</p>
      <Button type="primary">你好</Button>
      <DatePicker></DatePicker>
      <Test />
      <SayHi />
    </div>
  )
}

export default App

function SayHi() {
  return (
    <div>
      <h1 className="font-bold text-4xl">Hi</h1>
    </div>
  )
}
